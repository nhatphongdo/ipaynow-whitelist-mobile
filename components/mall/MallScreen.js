import React from "react";
import { connect } from "react-redux";
import { connectStyle, Container, Content } from "native-base";
import ThemeService from "../../services/ThemeService";
import { translate } from "../../constants/Languages";
import Screen from "../shared/Screen";
import TabNavigation from "../shared/TabNavigation";
import GroupBox from "../shared/GroupBox";
import AccountCard from "../shared/AccountCard";
import StyledText from "../shared/StyledText";

const themeStyle = ThemeService.getThemeStyle();

class MallScreen extends React.Component {
    render() {
        const styles = this.props.style;
        const MallIcon = ThemeService.getThemeStyle().variables.mallIcon;

        return (
            <Screen>
                <Container style={styles.container}>
                    <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
                        <AccountCard />
                        <GroupBox icon={<MallIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate("MALL")}>
                            <StyledText center h3 secondary bold="bold">
                                {translate("Coming soon")}
                            </StyledText>
                        </GroupBox>
                    </Content>
                </Container>
                <TabNavigation />
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
    const {} = state;
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(connectStyle("iPayNow.Mall", styles)(MallScreen));
