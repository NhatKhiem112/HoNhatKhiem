import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const Messenger = () => {
  const [activeTab, setActiveTab] = useState(0); // State for the active tab

  const tabs = [
    { name: 'Trò chuyện', icon: 'message', notification: 99 },
    { name: 'Đơn hàng', icon: 'package', notification: 0 },
    { name: 'Thông báo', icon: 'notifications', notification: 37 },
    { name: 'Khuyến mãi', icon: 'campaign', notification: 1 },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Tin nhắn</Text>
        <TouchableOpacity>
          <Text style={styles.markAsRead}>Đánh dấu đã đọc</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => setActiveTab(index)} // Set active tab on press
          >
            <Icon
              name={tab.icon}
              type="material"
              size={30}
              color={activeTab === index ? '#f50057' : '#FFF'} // Change color based on active tab
            />
            <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>{tab.name}</Text>
            {tab.notification > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>
                  {tab.notification > 99 ? '99+' : tab.notification}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Message List */}
      <ScrollView style={styles.messageList}>
        {[
          { title: 'HOT! Nhận Voucher *66K tại đây', time: '01:00 PM', details: 'Chỉ 1 click nhận Voucher đến *66000VND khi tham gia khảo sát này. Click ngay! *Dành cho 100 bạn đầu tiên', promo: true },
          { title: 'Nhận thêm Xu tại Trang Xu 11.11!', time: '09:30 AM', details: 'Tặng Xu & Thêm Quà!' },
          { title: 'ASRV', time: 'Hôm qua', details: '[Voucher] 🥰 Wow!! Bạn thấy đơn hàng đầu tiên như thế nào?' },
          { title: 'Psst... Ưu đãi bí mật dành riêng cho bạn', time: 'Hôm qua', details: 'OLEVS giảm giá sốc. Mua ngay kẻo hết!' },
        ].map((message, index) => (
          <View key={index} style={styles.message}>
            <View style={[styles.iconCircle, message.promo ? styles.promo : styles.normal]}>
              <Icon name={message.promo ? 'campaign' : 'bolt'} type="material" size={20} color="#FFF" />
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.messageTitle}>{message.title}</Text>
              <Text style={styles.messageTime}>{message.time}</Text>
              <Text style={styles.messageDetails}>{message.details}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  headerText: { fontSize: 18, color: '#000' },
  markAsRead: { color: '#000' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#EEE' },
  tab: { alignItems: 'center' },
  tabText: { color: '#000', marginTop: 5 },
  activeTabText: { fontWeight: 'bold', color: '#f50057' }, // Active tab text style
  notificationBadge: { position: 'absolute', top: 0, right: 10, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5 },
  notificationText: { color: '#FFF', fontSize: 12 },
  messageList: { padding: 10 },
  message: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#CCC' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  promo: { backgroundColor: '#f50057' },
  normal: { backgroundColor: '#ff9800' },
  messageContent: { marginLeft: 10, flex: 1 },
  messageTitle: { fontSize: 16, color: '#000' },
  messageTime: { fontSize: 12, color: '#666', marginVertical: 2 },
  messageDetails: { fontSize: 14, color: '#000' },
});

export default Messenger;
