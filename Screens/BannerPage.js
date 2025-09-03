import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import Constants from 'expo-constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: 'slide1',
    title: 'Smart Search, Nearby Stays',
    description:
      'Discover hostels conveniently located near your college, office, or any hotspot of your choice. With advanced filters and location-based results.',
    image: require('../assets/Banner1.png'),
  },
  {
    key: 'slide2',
    title: 'Verified & Safe Stays',
    description:
      'Every hostel listed is carefully verified to meet our quality and safety standards. We ensure your stay confidently that prioritize your comfort.',
    image: require('../assets/Banner2.png'),
  },
  {
    key: 'slide3',
    title: 'Easy and Hassle-Free Bookings',
    description:
      "Booking your hostel is now quick, smooth, and entirely digital. No long forms, no endless calls—just a few taps and you're done.",
    image: require('../assets/Banner3.png'),
  },
];

const BannerPage = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ index });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollToIndex(currentIndex + 1);
    } else {
      navigation.navigate('SignUp'); 
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const getButtonStyle = () => {
    return currentIndex === 0 ? styles.getStartedButton : styles.nextButton;
  };

 const getButtonText = () => {
  if (currentIndex === 0) return 'Get Started';
  if (currentIndex === slides.length - 1) return 'Next';
  return 'Next';
};


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Android StatusBar Fallback */}
      {Platform.OS === 'android' && (
        <View style={styles.statusBarBackground} />
      )}

      <StatusBar
        translucent
        backgroundColor="#fff"
        barStyle="dark-content"
      />

      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfigRef.current}
        />

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={getButtonStyle()} onPress={handleNext}>
            <Text style={styles.buttonText}>{getButtonText()}</Text>
          </TouchableOpacity>

          <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
              <Pressable key={index} onPress={() => scrollToIndex(index)}>
                <View
                  style={[
                    styles.dot,
                    index === currentIndex && styles.activeDot,
                  ]}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FF0202',
  },
  statusBarBackground: {
    height: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    backgroundColor: '#FF0202',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: hp('7.5%'),
  },
  bottomContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: hp('3.75%'),
  },
  slide: {
    width: wp('100%'),
    alignItems: 'center',
    paddingHorizontal: wp('6%'),
    paddingTop: hp('7.5%'),
    marginTop: hp('10%'),
  },
  imageContainer: {
    backgroundColor: '#FFF8F3',
    width: wp('100%'),
    height: hp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: wp('45%'),
    borderBottomRightRadius: wp('0%'),
    marginTop: hp('-18.75%'),
  },
  image: {
    width: wp('80%'),
    height: hp('62.5%'),
  },
  title: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('8%'),
    color: '#000',
  },
  description: {
    fontSize: hp('1.7%'),
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: wp('2.5%'),
    marginTop: hp('2%'),
    lineHeight: hp('3%'),
  },
  getStartedButton: {
    backgroundColor: '#f44336',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('25%'),
    borderRadius: wp('2%'),
    width: wp('75%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('3.75%'),
  },
  nextButton: {
    backgroundColor: '#f44',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('25%'),
    borderRadius: wp('2%'),
    width: wp('75%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('3.75%'),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp('5%'),
  },
  dot: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    backgroundColor: '#ccc',
    marginHorizontal: wp('1.5%'),
  },
  activeDot: {
    backgroundColor: '#f44336',
    width: wp('4%'),
  },
});

export default BannerPage;
