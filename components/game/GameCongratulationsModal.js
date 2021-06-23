import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { connectStyle, View } from 'native-base';
import ThemeService from '../../services/ThemeService';
import { translate } from '../../constants/Languages';
import Modal from 'react-native-modal';
import StyledText from '../shared/StyledText';
import { LUCKY_DRAW_GAME, ROLLING_DICE_GAME } from '../../stores/game/constants';

class GameCongratulationsModal extends React.Component {
    render() {
        const styles = this.props.style;
        const { game, result } = this.props;
        const CongratulationsImage = ThemeService.getThemeStyle().variables.congratulationsImage;

        let message = '';
        if (game === LUCKY_DRAW_GAME) {
            message = translate('You have won the lucky draw with number {0}', result) + ' ';
        } else if (game === ROLLING_DICE_GAME) {
            message = translate('You have won the rolling dice with dice [{0}]', result.join ? result.join(', ') : result) + ' ';
        }

        return (
            <View>
                <Modal
                    isVisible={this.props.isVisible}
                    animationIn="bounceIn"
                    animationOut="bounceOut"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                    avoidKeyboard={true}
                    backdropOpacity={0.8}
                    onBackdropPress={this.props.onBackdropPress}
                >
                    <TouchableWithoutFeedback onPress={this.props.onBackdropPress}>
                        <View style={styles.container}>
                            <CongratulationsImage />
                            <StyledText spaceTop pink large bold="bold">
                                {translate('Congratulations')}
                            </StyledText>
                            <StyledText spaceTop center white bold="bold">
                                {message}
                                {translate('Your prize will be credited into your Account Balance automatically')}
                            </StyledText>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    congras: {
        textAlign: 'center'
    },
    description: {
        textAlign: 'center'
    }
};

const mapStateToProps = state => {
    const {} = state;
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(connectStyle('iPayNow.GameCongratulations', styles)(GameCongratulationsModal));
