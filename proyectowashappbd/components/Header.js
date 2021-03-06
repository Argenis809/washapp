import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  View,
  Image
} from 'react-native';

import { Button, Block, NavBar, Text, theme } from 'galio-framework';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import argonTheme from '../constants/Theme';


const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]}>
    <Image style={styles.tinyLogo} source={require('../assets/imgs/Logo.png')} />
  </TouchableOpacity>
);

//const BasketButton = ({isWhite, style, navigation}) => (
//<TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
//<Icon
// family="ArgonExtra"
// size={16}
// name="basket"
// color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
// />
//</TouchableOpacity>
//);

const SearchButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('Pro')}>
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderRight = () => {
    const { white, title, navigation } = this.props;

    if (title === 'Title') {
      return [
        <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
        //<BasketButton key='basket-title' navigation={navigation} isWhite={white} />
      ];
    }

    switch (title) {
      case 'Hogar':
        return [
          <BellButton
            key="chat-hogar"
            navigation={navigation}
            isWhite={white}
          />,
          //<BasketButton key='basket-home' navigation={navigation} isWhite={white} />
        ];
      case 'Deals':
        return [
          <BellButton key="chat-categories" navigation={navigation} />,
          //<BasketButton key='basket-categories' navigation={navigation} />
        ];
      case 'Categories':
        return [
          <BellButton
            key="chat-categories"
            navigation={navigation}
            isWhite={white}
          />,
          //<BasketButton key='basket-categories' navigation={navigation} isWhite={white} />
        ];
      case 'Category':
        return [
          <BellButton
            key="chat-deals"
            navigation={navigation}
            isWhite={white}
          />,
          //<BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ];
      case 'SingIn':
        return [
          <BellButton
            key="chat-deals"
            navigation={navigation}
            isWhite={white}
          />,
          //<BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ];
      case 'Perfil':
        return [
          <BellButton
            key="chat-profile"
            navigation={navigation}
            isWhite={white}
          />,
          //<BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ];
      case 'Product':
        return [
          <SearchButton
            key="search-product"
            navigation={navigation}
            isWhite={white}
          />,
          //<BasketButton key='basket-product' navigation={navigation} isWhite={white} />
        ];
      case 'Search':
        return [
          <BellButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          //<BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ];
      case 'Settings':
        return [
          <BellButton
            key="chat-search"
            navigation={navigation}
            isWhite={white}
          />,
          //<BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ];
      default:
        break;
    }
  };
  renderSearch = () => {
    const { navigation } = this.props;

    return (
      <View style={{ marginTop: 0, flex: 0 }}>
      </View>
    );
  };
  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return <Block row style={styles.options}></Block>;
  };
  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={(id) => navigation.setParams({ tabId: id })}
      />
    );
  };
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;

    const noShadow = [
      'Search',
      'Categories',
      'Deals',
      'Pro',
      'Profile',
      'SingIn',
    ].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor },
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon
              name={back ? 'chevron-left' : 'menu'}
              family="entypo"
              size={20}
              onPress={this.handleLeftPress}
              color={
                iconColor ||
                (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)
              }
              style={{ marginTop: 2 }}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    backgroundColor: theme.COLORS.WHITE,
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },

  search: {
    height: 68,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: argonTheme.COLORS.PRIMARY,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  titleText2: {
    width: width - theme.SIZES.BASE * 2,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default withNavigation(Header);
