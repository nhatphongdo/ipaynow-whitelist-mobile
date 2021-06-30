import React from 'react';
import { FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, Container, Content, View, Spinner } from 'native-base';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine } from 'rn-placeholder';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import '@ethersproject/shims'
import { ethers } from 'ethers';
import numeral from 'numeral';
import ThemeService from '../../services/ThemeService';
import { translate } from '../../constants/Languages';
import { clone, formatCrypto, formatCurrency } from '../../common/helper';
import Screen from '../shared/Screen';
import TabNavigation from '../shared/TabNavigation';
import GroupBox from '../shared/GroupBox';
import AccountCard from '../shared/AccountCard';
import Segment from '../shared/Segment';
import ListItem from '../shared/ListItem';
import StyledText from '../shared/StyledText';
import Button from '../shared/Button';
import { getStores, purchase, pay } from '../../stores/market/actions';
import { SPECIAL_FORMAT, MEMBERSHIP } from '../../stores/market/constants';
import { updateTransaction } from '../../stores/storage/actions';
import DropdownAlertService from '../../services/DropdownAlertService';
import {
  sendToken,
  getBlockNumber,
  getTransactionReceipt,
  getTransaction,
  submitTransaction,
  estimateGas,
  getWalletInfo
} from '../../stores/wallet/actions';
import { MAXIMUM_TRIES, CONFIRMATION_PERIOD, CONFIRMATION_BLOCKS } from '../../stores/wallet/constants';
import { BUY_STORE_ITEM } from '../../stores/storage/constants';
import { EnterPinCode } from '../init/PinCodeScreen';
import { showAlert, hideAlert } from '../../stores/alert/actions';

class StoreScreen extends React.Component {
  _confirmingTimer = null;
  _confirmingTries = 0;

  state = {
    stores: [null, null, null, null, null],
    categories: [],
    category: '',

    sending: false,
    confirming: false,
    confirmationCount: 0,
    transaction: null,
    transactionStatus: null,
    blockNumber: 0,
    purchaseId: 0,
    completing: false,

    animationEnded: false
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  componentWillUnmount() {
    if (this._confirmingTimer) {
      clearInterval(this._confirmingTimer);
      this._confirmingTimer = null;
    }
  }

  _bootstrapAsync = async () => {
    // Get stores
    this.setState({ stores: [null, null, null, null, null] });
    const stores = await this.props.getStores();
    const categories = [translate('ALL')];
    for (let i = 0; i < stores.length; i++) {
      if (stores[i].type === SPECIAL_FORMAT) {
        categories.push(translate('SPECIAL FORMAT'));
        break;
      }
    }
    for (let i = 0; i < stores.length; i++) {
      if (stores[i].type === MEMBERSHIP) {
        categories.push(translate('MEMBERSHIP'));
        break;
      }
    }
    const storeItems = [];
    for (let i = 0; i < stores.length; i++) {
      if (Array.isArray(stores[i].value)) {
        for (let j = 0; j < stores[i].value.length; j++) {
          const item = clone(stores[i]);
          Object.keys(item.name).forEach(key => {
            item.name[key] = item.name[key] + ': ' + stores[i].value[j];
          });
          item.value = stores[i].value[j];
          storeItems.push(item);
        }
      } else {
        const item = clone(stores[i]);
        storeItems.push(item);
      }
    }
    this.setState({ stores: storeItems, categories });
  };

  onCategoryChanged = (category, index) => {
    if (index === 0) {
      this.setState({ category: '' });
    } else {
      this.setState({ category });
    }
  };

  send = async (address, amountValue, purchaseId) => {
    // Send
    this.setState({
      sending: true,
      confirming: true,
      confirmationCount: 0,
      animationEnded: false
    });
    const transaction = await this.props.sendToken(address, amountValue.format('0.000000000000000000'));
    if (transaction.error) {
      // Failed
      this.setState({
        transaction: null,
        transactionStatus: null,
        confirming: false,
        errorMessage: transaction.error
      });
      return;
    }

    // Save to database
    await this.props.updateTransaction(address, amountValue.value(), 'USDT', '', BUY_STORE_ITEM, transaction.result.hash)

    // Submit transaction to server
    const sendResult = await this.props.submitTransaction(transaction.result.hash, address, amountValue.value(), false);

    // Wait for confirmation
    const blockNumber = 0; // await this.props.getBlockNumber();
    this.setState(
      {
        transaction: transaction.result,
        transactionStatus: null,
        blockNumber,
        confirming: true,
        purchaseId
      },
      () => {
        this._confirmingTries = 0;
        this._confirmingTimer = setInterval(this.confirmingHandler, CONFIRMATION_PERIOD);
      }
    );
  };

  confirmingHandler = async () => {
    if (
      !this.state.transaction ||
      this._confirmingTries > MAXIMUM_TRIES ||
      (this.state.transactionStatus !== null && this.state.confirmationCount >= CONFIRMATION_BLOCKS)
    ) {
      // Stop
      clearInterval(this._confirmingTimer);
      this._confirmingTimer = null;
      this.setState({ confirming: false });
      this.props.getWalletInfo();
      return;
    }

    if (this.state.blockNumber === 0) {
      const tx = await this.props.getTransaction(this.state.transaction.hash);
      if (tx === null || !tx.blockNumber) {
        this._confirmingTries += 1;
        return;
      }

      this.setState({ blockNumber: tx.blockNumber, confirmationCount: 0 });
    } else {
      // Get block number
      const blockNumber = await this.props.getBlockNumber();
      if (this.state.confirmationCount < blockNumber - this.state.blockNumber) {
        // Only increment
        this.setState({ confirmationCount: blockNumber - this.state.blockNumber });
      }
    }

    // Get transaction
    const receipt = await this.props.getTransactionReceipt(this.state.transaction.hash);

    // if (receipt.status === 1) {
    //     // Stop
    //     clearInterval(this._confirmingTimer);
    //     this._confirmingTimer = null;
    //     this.setState({ confirming: false });
    //     this.props.getWalletInfo();
    //     return;
    // }

    this.setState({ transactionStatus: receipt.status });
  };

  onComplete = async () => {
    this.setState({ completing: true });
    const result = await this.props.pay(this.state.purchaseId, this.state.transaction.hash);
    this.setState({ sending: false, completing: false });
    if (result.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error));
      return;
    }

    DropdownAlertService.show(DropdownAlertService.SUCCESS, translate('Success'), translate('Item is bought successfully'));
  };

  onFloatButton = (self, item) => {
    if (self === 0) {
      // Buy button
      this.props.showAlert({
        title: translate('Confirm!'),
        message: translate('Do you really want to buy {0} with {1}?', [
          item.name[this.props.settings.language],
          formatCurrency(item.price, this.props.settings.culture, item.unit.toUpperCase())
        ]),
        showConfirmButton: true,
        onConfirmPressed: async () => {
          this.props.showAlert({
            title: translate('Wait for processing'),
            showProgress: true,
            closeOnHardwareBackPress: false,
            closeOnTouchOutside: false,
            progressSize: 'large',
            showCancelButton: false
          });

          let amountValue = numeral(item.price);
          if (isNaN(amountValue.value()) || amountValue.value() === null || amountValue.value() <= 0) {
            // This is not valid amount
            this.props.hideAlert();
            DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Amount is not valid'));
            return;
          }

          // Check type
          if (item.unit.toLowerCase() === 'reward') {
            if (amountValue.value() > this.props.reward.balance) {
              this.props.hideAlert();
              DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Insufficient balance to buy'));
              return;
            }

            // Add to cart
            const purchaseResult = await this.props.purchase(item.id, item.value);
            if (purchaseResult.error) {
              this.props.hideAlert();
              DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(purchaseResult.error));
              return;
            }

            const result = await this.props.pay(purchaseResult.result.id);
            this.props.hideAlert();
            if (result.error) {
              DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error));
              return;
            }

            DropdownAlertService.show(DropdownAlertService.SUCCESS, translate('Success'), translate('Item is bought successfully'));
          } else if (item.unit.toLowerCase() === 'usdt') {
            if (amountValue.value() > this.props.wallet.tokenBalance) {
              this.props.hideAlert();
              DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Insufficient balance to buy'));
              return;
            }

            // Estimate gas
            const gas = await this.props.estimateGas(this.props.settings.storeWallet, amountValue.format('0.000000000000000000'));
            if (gas > this.props.wallet.ethBalance) {
              this.props.hideAlert();
              DropdownAlertService.show(
                DropdownAlertService.ERROR,
                translate('Error'),
                translate('Insufficient gas to send You need at least {0} ETH as gas to buy', formatCrypto(gas))
              );
              return;
            }

            // Add to cart
            const purchaseResult = await this.props.purchase(item.id, item.value);
            if (purchaseResult.error) {
              this.props.hideAlert();
              DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(purchaseResult.error));
              return;
            }

            this.props.hideAlert();

            // Verify pin before send
            if (this.props.settings.alwaysVerifyBeforeSend) {
              this.props.navigation.navigate('PinCode', {
                type: EnterPinCode,
                onEnterSuccess: pin => {
                  setTimeout(() => {
                    this.send(this.props.settings.storeWallet, amountValue, purchaseResult.result.id);
                  }, 1000);
                }
              });
            } else {
              await this.send(this.props.settings.storeWallet, amountValue, purchaseResult.result.id);
            }
          } else {
            this.props.hideAlert();
          }
        }
      });
    }
  };

  _keyExtractor = (item, index) => index.toString();

  _floatBar = item => ListItem.DefaultFloatBar(item, this.onFloatButton);

  _renderItem = ({ item, index }) => {
    const styles = this.props.style;
    if (!item) {
      return (
        <Placeholder Animation={Shine} Left={props => <PlaceholderMedia isRound={true} style={props.style} />} style={styles.itemContainer}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      );
    }

    let name = item.nameEn;
    return (
      <ListItem
        highlight
        avatar={
          item.type === SPECIAL_FORMAT
            ? require('../../assets/images/special-format-icon.png')
            : item.type === MEMBERSHIP
            ? require('../../assets/images/membership-icon.png')
            : null
        }
        mainNumberOfLines={2}
        subNumberOfLines={1}
        containerStyle={styles.itemContainer}
        mainTextStyle={styles.itemMainText}
        subTextStyle={styles.itemSubText}
        mainText={item.name[this.props.settings.language]}
        subText={formatCurrency(item.price, this.props.settings.culture, item.unit.toUpperCase())}
        floatBar={this._floatBar(item)}
      />
    );
  };

  render() {
    const styles = this.props.style;
    const StoreIcon = ThemeService.getThemeStyle().variables.storeIcon;

    const storeItems = !this.state.stores
      ? []
      : this.state.stores.filter(item =>
          this.state.category === ''
            ? true
            : this.state.category === translate('SPECIAL FORMAT')
            ? item.type === SPECIAL_FORMAT
            : this.state.category === translate('MEMBERSHIP')
            ? item.type === MEMBERSHIP
            : false
        );

    return (
      <Screen title={translate('STORE')}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <GroupBox icon={<StoreIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate('STORE')} fullHeight>
              <Segment data={this.state.categories} onSelectionChanged={this.onCategoryChanged} />
              {storeItems.length === 0 && (
                <StyledText spaceTop info h3 center bold='medium'>
                  {translate('There is no item available')}
                </StyledText>
              )}
              {storeItems.length > 0 && (
                <FlatList
                  style={styles.list}
                  contentContainerStyle={styles.listContent}
                  data={storeItems}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                />
              )}
            </GroupBox>
          </Content>
        </Container>
        <TabNavigation />
        <Modal
          isVisible={this.state.sending}
          animationIn='bounceIn'
          animationOut='bounceOut'
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          avoidKeyboard={true}
          backdropOpacity={0.8}
          style={ThemeService.getThemeStyle().modalScreen}
        >
          {this.state.sending && this.state.confirming && (
            <View flexFull flexCenter padder>
              {false && <StyledText white>{translate('Transaction Hash')}</StyledText>}
              {false && this.state.transaction && (
                <StyledText secondary h4 smallSpaceTop spaceBottom bold='bold'>
                  {this.state.transaction.hash}
                </StyledText>
              )}
              <StyledText white>{translate('Processing')}</StyledText>
              <StyledText secondary veryLarge smallSpaceTop spaceBottom bold='bold'>
                {this.state.confirmationCount}/{CONFIRMATION_BLOCKS}
              </StyledText>
              {false && <StyledText note>{translate('Please wait for confirmation')}</StyledText>}
              <StyledText white>{translate('Please wait for sending')}</StyledText>
            </View>
          )}
          {this.state.sending && !this.state.confirming && this.state.transaction && (
            <View flexFull flexCenter padder>
              {!this.state.animationEnded && (
                <Lottie
                  style={ThemeService.getThemeStyle().animation}
                  source={require('../../assets/animations/confetti.json')}
                  speed={0.5}
                  autoPlay={true}
                  loop={false}
                  onAnimationFinish={() => this.setState({ animationEnded: true })}
                />
              )}
              {Platform.OS === 'ios' && !this.state.animationEnded && (
                <Lottie
                  style={[ThemeService.getThemeStyle().animation, { height: ThemeService.getThemeStyle().variables.deviceHeight / 2 }]}
                  source={require('../../assets/animations/exploding-ribbon-and-confetti.json')}
                  speed={0.8}
                  autoPlay={true}
                  loop={false}
                />
              )}
              <StyledText pink h3>
                {translate('Send completed!')}
              </StyledText>
              <Button spaceTop spaceBottom thirdary onPress={this.onComplete} disabled={this.state.completing}>
                {!this.state.completing && <StyledText>{translate('Close')}</StyledText>}
                {this.state.completing && <Spinner color='#62C0B3' />}
              </Button>
            </View>
          )}
          {this.state.sending && !this.state.confirming && !this.state.transaction && (
            <View flexFull flexCenter padder>
              <StyledText pink h3>
                {translate('Send failed!!!')}
              </StyledText>
              <Button spaceTop spaceBottom thirdary onPress={() => this.setState({ sending: false })}>
                {translate('Close')}
              </Button>
            </View>
          )}
        </Modal>
      </Screen>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  }
};

const mapStateToProps = state => {
  const { settings, wallet, storage, reward, market } = state;
  return { settings, wallet, storage, reward, market };
};

const mapDispatchToProps = dispatch => {
  return {
    showAlert: config => dispatch(showAlert(config)),
    hideAlert: () => dispatch(hideAlert()),
    getStores: () => dispatch(getStores()),
    purchase: (id, value) => dispatch(purchase(id, value)),
    pay: (id, txHash) => dispatch(pay(id, txHash)),
    updateTransaction: (toAddress, amount, unit, description, type, txHash) =>
      dispatch(updateTransaction(toAddress, amount, unit, description, type, txHash)),
    sendToken: (toAddress, amount) => dispatch(sendToken(toAddress, amount)),
    getBlockNumber: () => dispatch(getBlockNumber()),
    getTransaction: id => dispatch(getTransaction(id)),
    getTransactionReceipt: id => dispatch(getTransactionReceipt(id)),
    submitTransaction: (txHash, toAddress, amount, isEth) => dispatch(submitTransaction(txHash, toAddress, amount, isEth)),
    estimateGas: (to, amount, isToken) => dispatch(estimateGas(to, amount, isToken)),
    getWalletInfo: () => dispatch(getWalletInfo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.Store', styles)(StoreScreen));
