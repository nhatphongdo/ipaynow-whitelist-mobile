import React from 'react';
import { Image } from 'react-native';
import { connectStyle, View, Thumbnail } from 'native-base';
import ThemeService from '../../services/ThemeService';
import Button from '../shared/Button';
import StyledText from '../shared/StyledText';
import NavigationService from '../../services/NavigationService';
import { getImageLink } from '../../common/helper';

class MerchantItem extends React.Component {
    onMerchant = () => {
        NavigationService.navigate('MerchantDetail', {
            id: this.props.data.id
        });
    };

    render() {
        const { data } = this.props;
        const styles = this.props.style;

        return (
            <Button smallSpaceBottom style={styles.item} onPress={this.onMerchant}>
                <Image style={styles.backgroundImage} source={{ uri: getImageLink(data.vendorImages) }} />
                <View row style={styles.container}>
                    <View bigLightShadow style={styles.logoContainer}>
                        <Thumbnail style={styles.logo} source={{ uri: getImageLink(data.vendorLogo) }} />
                    </View>
                    <View smallSpaceRight style={styles.info}>
                        <StyledText style={styles.brand} numberOfLines={2} adjustsFontSizeToFit>
                            {data.vendorName}
                        </StyledText>
                        <StyledText h4 bold="medium" style={styles.service}>
                            {data.vendorService}
                        </StyledText>
                        <StyledText h4 bold="medium" style={styles.address}>
                            {data.vendorAddress}
                        </StyledText>
                    </View>
                </View>
            </Button>
        );
    }
}

const styles = {};

export default connectStyle('iPayNow.MerchantItem', styles)(MerchantItem);
