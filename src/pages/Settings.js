import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  ScrollView,
  Dimensions,
  Button,
  StyleSheet
} from "react-native";
import firebase from "react-native-firebase";
import CheckmateSnackBar from "../components/CheckmateSnackBar";
import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
  SettingsSwitch,
  SettingsPicker,
  SettingsTextLabel
} from "react-native-settings-components";
import NavigationContext from "../components/NavigationContext";
import { strings, possiblePalettes, globalStyles } from "../config";
import { adsHeight } from "../scripts/getSizes";

export default class HomePage extends Component<Props> {
  static navigationOptions = {
    title: "Settings",
    header: null,
    drawerLabel: () => (
      <NavigationContext.Consumer>
        {data => {
          return (
            <Text style={globalStyles.drawerItemLabel}>
              {strings.settings[data.lang]}
            </Text>
          );
        }}
      </NavigationContext.Consumer>
    )
  };

  state = {
    adLoaded: false
  };

  constructor() {
    super();
    this.Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    this.request = new AdRequest();
  }

  componentDidMount() {
    firebase.analytics().logEvent(`open_settings`);
  }

  render() {
    const { Banner, request } = this;

    return (
      <View style={styles.container}>
        <NavigationContext.Consumer>
          {data => {
            const {
              lang,
              updateLang,
              updatePalette,
              handleReplay,
              palette,
              setRotation,
              rotated,
              showValidMoves,
              updateValidMovesConfig
            } = data;
            return (
              <React.Fragment>
                <ScrollView
                  style={styles.scrollView}
                  contentContainerStyle={{
                    width: Dimensions.get("window").width
                  }}
                >
                  <View style={{ height: 5 }} />
                  <SettingsCategoryHeader title={strings.personalize[lang]} />
                  <SettingsTextLabel
                    title={strings.personalizeSettingsLabel[lang]}
                  />
                  <SettingsDividerShort containerStyle={{ height: 2 }} />

                  <SettingsPicker
                    title={strings.lang[lang]}
                    dialogDescription={strings.chooseLang[lang]}
                    possibleValues={[
                      { label: "English", value: "en" },
                      { label: "??????????????????", value: "bg" },
                      { label: "????????????", value: "ru" }
                    ]}
                    negativeButtonTitle={strings.cancel[lang]}
                    positiveButtonTitle={strings.okaySettings[lang]}
                    onSaveValue={value => {
                      updateLang(value);
                    }}
                    value={lang}
                  />

                  <SettingsDividerShort />

                  <SettingsPicker
                    title={strings.colorPalettes[lang]}
                    dialogDescription={strings.selectPalette[lang]}
                    possibleValues={possiblePalettes()}
                    negativeButtonTitle={strings.cancel[lang]}
                    positiveButtonTitle={strings.okaySettings[lang]}
                    onSaveValue={value => {
                      updatePalette(value);
                    }}
                    value={palette}
                  />

                  <SettingsDividerShort />

                  <SettingsSwitch
                    title={strings.showValidMoves[lang]}
                    onSaveValue={updateValidMovesConfig}
                    value={showValidMoves}
                  />

                  <SettingsDividerLong />

                  <SettingsCategoryHeader title={strings.gameOptions[lang]} />
                  <SettingsTextLabel title={strings.sessionOnlyLabel[lang]} />
                  <SettingsDividerShort containerStyle={{ height: 2 }} />

                  <SettingsSwitch
                    title={strings.rotateBlackPiecesSetting[lang]}
                    onSaveValue={setRotation}
                    value={rotated}
                  />

                  <SettingsTextLabel
                    containerStyle={{ width: "75%", marginTop: -10 }}
                    titleStyle={{ paddingTop: 0, fontSize: 12 }}
                    title={strings.rotateBlackPiecesLabel[lang]}
                  />

                  <SettingsDividerLong />
                  <SettingsCategoryHeader title={strings.fastAction[lang]} />

                  <View style={styles.newGameContainer}>
                    <Button
                      onPress={() => {
                        handleReplay();
                        this.props.navigation.navigate("Play");
                      }}
                      title={strings.newGame[lang]}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      onPress={() => {
                        this.props.navigation.navigate("About");
                      }}
                      title={strings.aboutRSGChess[lang]}
                    />
                  </View>
                </ScrollView>
                <View
                  style={{
                    height: adsHeight(Dimensions.get("window").height),
                    backgroundColor: "#dfdfdf",
                    display: this.state.adLoaded ? "flex" : "none"
                  }}
                >
                  <Banner
                    size={"SMART_BANNER"}
                    request={request.build()}
                    unitId={"ca-app-pub-3522556458609123/4507746605"}
                    onAdLoaded={() => {
                      this.setState({ adLoaded: true });
                    }}
                  />
                </View>
                <CheckmateSnackBar navigate={this.props.navigation.navigate} />
              </React.Fragment>
            );
          }}
        </NavigationContext.Consumer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white"
  },
  scrollView: { flex: 1 },
  newGameContainer: {
    padding: 16,
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 4
  },
  buttonContainer: {
    padding: 16,
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 4
  }
});
