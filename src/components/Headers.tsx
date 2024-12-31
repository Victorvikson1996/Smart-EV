import React, { useState, useContext, type ReactNode } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  SafeAreaView,
  Alert,
  Text
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import {
  appgreen,
  apppurple,
  borderGrey,
  darkGreen,
  green,
  lightGreen,
  lightOrange,
  lightRed,
  orange,
  primaryBlue,
  primaryTextColor,
  purple,
  red,
  secondaryTextColor
} from '../constants';

import { useHeaderHeight } from '../hooks';

type BackHeaderProps = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showContent?: boolean;
  RightComponent?: ReactNode;
  progressValueBlue?: number;
  progressValueGrey?: number;
  showProgress?: boolean;
};

export const BackHeader = ({
  title,
  subtitle,
  showBack = true,
  showContent = true,
  RightComponent,
  progressValueBlue,
  progressValueGrey,
  showProgress
}: BackHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, styles.backContainer]}>
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name='arrow-back' size={22} color={primaryTextColor} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 22 }} />
      )}
      {showProgress && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 7,
            marginStart: '20%',
            flexDirection: 'row'
          }}
        >
          {[...Array(progressValueBlue)].map((_, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                margin: 3,
                backgroundColor: appgreen,
                height: 3,
                width: '35%'
                // width: `${progressValue}%`,
              }}
            />
          ))}
          {[...Array(progressValueGrey)].map((_, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                margin: 3,
                backgroundColor: borderGrey,
                height: 3,
                width: '35%'
                // width: `${progressValue}%`,
              }}
            />
          ))}
        </View>
      )}
      {showContent && (
        <View style={[styles.headerContent, styles.backHeaderContent]}>
          <Text style={styles.backTitle}>{title}</Text>
          <Text style={styles.backSubtitle}>{subtitle}</Text>
        </View>
      )}
      {RightComponent ?? <View style={{ width: 22 }} />}
    </View>
  );
};

type AltHeaderProps = {
  title?: string;
  showBack?: boolean;
  RightComponent?: ReactNode;
  topInset?: boolean;
  subtitle?: string;
  marginBottom?: number;
};

export const AltHeader = ({
  RightComponent,
  showBack,
  title,
  topInset,
  subtitle,
  marginBottom
}: AltHeaderProps) => {
  const navigation = useNavigation();
  const { insets } = useHeaderHeight();

  const handleGoBack = () => navigation.canGoBack() && navigation.goBack();

  return (
    <>
      {topInset && <View style={{ height: insets.top }} />}
      <View style={[styles.altHeader, { marginBottom }]}>
        {navigation.canGoBack() && !showBack ? (
          <TouchableOpacity onPress={handleGoBack}>
            <Icon name='arrow-back' size={22} color={primaryTextColor} />
          </TouchableOpacity>
        ) : (
          <View style={{ height: 22, width: 22 }} />
        )}
        <View style={[styles.altHeaderContent]}>
          <Text
            style={[
              styles.backTitle,
              { marginBottom: subtitle ? 4 : 0, lineHeight: 24 }
            ]}
          >
            {title}
          </Text>
          {Boolean(subtitle) && (
            <Text style={styles.backSubtitle}>{subtitle}</Text>
          )}
        </View>
        <View>{RightComponent}</View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  altHeader: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  altHeaderContent: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -10
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  backContainer: {
    alignItems: 'flex-start',
    paddingVertical: 20
  },
  avatar: {
    backgroundColor: purple,
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: 10
  },
  backHeaderContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  support: {
    height: 36,
    width: 36,
    marginRight: 10,
    backgroundColor: '#E9EBF8'
  },
  backTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: '700'
  },
  backSubtitle: {
    textAlign: 'center'
  },
  modalCover: {
    flex: 1
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginTop: 55,
    marginLeft: 20,
    width: '70%'
  },
  link: {
    paddingVertical: 10
  },
  linkTitle: {
    fontSize: 13
  },
  linkSubtitle: {
    color: secondaryTextColor
  },
  button: {
    height: 40,
    marginTop: 30
  },
  titleCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  verified: {
    marginLeft: 7,
    backgroundColor: lightGreen,
    borderRadius: 50,
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  verifiedText: {
    color: darkGreen,
    fontSize: 10,
    textTransform: 'capitalize'
  }
});
