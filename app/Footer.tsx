import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Footer = () => {
  // Create separate state for each icon's rotation
  const [facebookRotation, setFacebookRotation] = useState(new Animated.Value(0));
  const [twitterRotation, setTwitterRotation] = useState(new Animated.Value(0));
  const [instagramRotation, setInstagramRotation] = useState(new Animated.Value(0));
  const [githubRotation, setGithubRotation] = useState(new Animated.Value(0));
  const [youtubeRotation, setYoutubeRotation] = useState(new Animated.Value(0));

  const rotateIcon = (rotationValue, setRotationValue) => {
    Animated.timing(rotationValue, {
      toValue: 1, // Rotate 1 full cycle (360 degrees)
      duration: 500, // Duration of 500ms
      useNativeDriver: true,
    }).start(() => {
      setRotationValue(new Animated.Value(0)); // Reset rotation after animation completes
    });
  };

  const resetIconRotation = (rotationValue, setRotationValue) => {
    Animated.timing(rotationValue, {
      toValue: 0, // Reset the rotation to 0 degrees
      duration: 200, // Short reset duration
      useNativeDriver: true,
    }).start(() => {
      setRotationValue(new Animated.Value(0)); // Ensure it resets after completion
    });
  };

  const sections = [
    {
      heading: 'CHĂM SÓC KHÁCH HÀNG',
      items: [
        'Trung Tâm Trợ Giúp', 'Shopee Blog', 'Shopee Mall', 'Hướng Dẫn Mua Hàng',
        'Hướng Dẫn Bán Hàng', 'Thanh Toán', 'Shopee Xu', 'Vận Chuyển',
        'Trả Hàng & Hoàn Tiền', 'Chăm Sóc Khách Hàng', 'Chính Sách Bảo Hành',
      ],
    },
    {
      heading: 'THANH TOÁN',
      logos: [
        'https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8',
        'https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16',
        'https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08',
        'https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c',
        'https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281',
        'https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09',
        'https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06',
        'https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492',
      ],
    },
    {
      heading: 'ĐƠN VỊ VẬN CHUYỂN',
      logos: [
        'https://down-vn.img.susercontent.com/file/vn-50009109-159200e3e365de418aae52b840f24185',
        'https://down-vn.img.susercontent.com/file/d10b0ec09f0322f9201a4f3daf378ed2',
        'https://down-vn.img.susercontent.com/file/vn-50009109-64f0b242486a67a3d29fd4bcf024a8c6',
        'https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f',
        'https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c',
      ],
    },
  ];

  // Interpolate each icon rotation
  const rotateInterpolation = (rotationValue) => {
    return rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  };

  return (
    <View style={styles.footer}>
      <ScrollView>
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.heading}>{section.heading}</Text>
            {section.items && section.items.map((item, idx) => (
              <TouchableOpacity key={idx} style={styles.item}>
                <Text style={styles.link}>{item}</Text>
              </TouchableOpacity>
            ))}
            {section.logos && (
              <View style={styles.logoContainer}>
                {section.logos.map((logo, idx) => (
                  <Image key={idx} source={{ uri: logo }} style={styles.logo} />
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <Text style={styles.heading}>THEO DÕI CHÚNG TÔI TRÊN</Text>

      <View style={styles.container}>
        {/* Facebook Icon */}
        <TouchableOpacity
          style={[styles.iconContainer, styles.facebook]}
          onMouseEnter={() => rotateIcon(facebookRotation, setFacebookRotation)}
          onMouseLeave={() => resetIconRotation(facebookRotation, setFacebookRotation)}
        >
          <Animated.View style={{ transform: [{ rotate: rotateInterpolation(facebookRotation) }] }}>
            <Icon name="logo-facebook" style={styles.icon} />
          </Animated.View>
        </TouchableOpacity>

        {/* Twitter Icon */}
        <TouchableOpacity
          style={[styles.iconContainer, styles.twitter]}
          onMouseEnter={() => rotateIcon(twitterRotation, setTwitterRotation)}
          onMouseLeave={() => resetIconRotation(twitterRotation, setTwitterRotation)}
        >
          <Animated.View style={{ transform: [{ rotate: rotateInterpolation(twitterRotation) }] }}>
            <Icon name="logo-twitter" style={styles.icon} />
          </Animated.View>
        </TouchableOpacity>

        {/* Instagram Icon */}
        <TouchableOpacity
          style={[styles.iconContainer, styles.instagram]}
          onMouseEnter={() => rotateIcon(instagramRotation, setInstagramRotation)}
          onMouseLeave={() => resetIconRotation(instagramRotation, setInstagramRotation)}
        >
          <Animated.View style={{ transform: [{ rotate: rotateInterpolation(instagramRotation) }] }}>
            <Icon name="logo-instagram" style={styles.icon} />
          </Animated.View>
        </TouchableOpacity>

        {/* GitHub Icon */}
        <TouchableOpacity
          style={[styles.iconContainer, styles.git]}
          onMouseEnter={() => rotateIcon(githubRotation, setGithubRotation)}
          onMouseLeave={() => resetIconRotation(githubRotation, setGithubRotation)}
        >
          <Animated.View style={{ transform: [{ rotate: rotateInterpolation(githubRotation) }] }}>
            <Icon name="logo-github" style={styles.icon} />
          </Animated.View>
        </TouchableOpacity>

        {/* YouTube Icon */}
        <TouchableOpacity
          style={[styles.iconContainer, styles.youtube]}
          onMouseEnter={() => rotateIcon(youtubeRotation, setYoutubeRotation)}
          onMouseLeave={() => resetIconRotation(youtubeRotation, setYoutubeRotation)}
        >
          <Animated.View style={{ transform: [{ rotate: rotateInterpolation(youtubeRotation) }] }}>
            <Icon name="logo-youtube" style={styles.icon} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={styles.link}>
        <Text style={styles.linkText}>Hãy Theo dõi chúng tôi</Text>
      </View>

      <View style={styles.copyright}>
        <Text style={styles.text}>Copyright © 2024. All rights reserved by Ho Nhat Khiem.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#FFCCCC',
    paddingVertical: 16,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    marginBottom: 8,
  },
  link: {
    color: '#333',
  },
  logoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  logo: {
    width: 60,
    height: 40,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f3',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: '#ecf0f3',
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  icon: {
    fontSize: 25,
  },
  facebook: {
    color: 'rgb(101, 101, 203)',
  },
  twitter: {
    color: 'rgb(26, 164, 233)',
  },
  instagram: {
    color: 'rgb(230, 87, 163)',
  },
  git: {
    color: 'rgb(27, 27, 27)',
  },
  youtube: {
    color: 'rgb(255, 0, 0)',
  },
  copyright: {
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    color: '#888',
  },
  linkText: {
    backgroundColor: '#ecf0f3',
    color: 'red',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default Footer;
