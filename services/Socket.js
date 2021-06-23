import SocketIOClient from "socket.io-client";
import NavigationService from "./NavigationService";
import { BASE_SOCKET_URL } from "../constants/Constants";
import { getWalletInfo } from "../stores/wallet/actions";
import { getRewardInfo } from "../stores/rewards/actions";
import { gameRegistered } from "../stores/game/actions";
import { sign } from "../common/helper";

let _store = null;
let socket = SocketIOClient(BASE_SOCKET_URL);
let _connected = false;

socket.on("connect", async () => {
  // Re-identify
  await connect();
});

socket.on("disconnect", async () => {
  _connected = false;
});

socket.on("wallet_updated", async () => {
  if (!_store) {
    return;
  }

  // Load crypto balance
  await _store.dispatch(getWalletInfo());

  // Load reward info
  await _store.dispatch(getRewardInfo());
});

socket.on("game_unavailable", async args => {
  console.log("Game unavailable", gameId);
});

socket.on("game_completed", async args => {
  console.log("Game completed ", gameId);
});

socket.on("game_error", async args => {
  console.log("Game error ", gameId);
});

socket.on("game_win", async args => {
  // Show slot
  NavigationService.navigate("LuckyDrawPlay", {
    id: args[0]
  });

  if (!_store) {
    return;
  }
  _store.dispatch(gameRegistered({ id: args[0], winningNumber: args[1].winningNumber, win: true }));
});

socket.on("game_lose", async args => {
  // Show slot
  NavigationService.navigate("LuckyDrawPlay", {
    id: args[0]
  });

  if (!_store) {
    return;
  }
  _store.dispatch(gameRegistered({ id: args[0], winningNumber: args[1].winningNumber, win: false }));
});

function setStore(store) {
  _store = store;
}

function isConnected() {
  return _connected;
}

const emit = (event, ...args) =>
  new Promise((resolve, reject) => {
    if (!socket.connected) {
      return reject(new Error("Socket is not connected"));
    }
    socket.emit(event, ...args, ({ error, result }) => {
      if (error) {
        console.log(error);
        return reject(error);
      }

      resolve(result);
    });
  });

async function connect() {
  if (!_store) {
    return;
  }
  const walletAddress = _store.getState().wallet.cryptoWallet.address;
  const nonce = new Date().getTime();
  const signature = await sign(
    _store.getState().account.privateKey,
    _store.getState().account.serverPublicKey,
    JSON.stringify({ nonce, walletAddress })
  );

  try {
    await emit("identify", walletAddress, nonce, signature);
    _connected = true;
  } catch (err) {
    _connected = false;
  }
}

export default {
  socket,
  setStore,
  connect,
  emit,
  isConnected
};
