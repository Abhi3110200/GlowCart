import type React from "react"
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/Ionicons"
import EditIcon from "../assets/svg/EditIcon"
import LocationIcon from "../assets/svg/LocationIcon"
import OrderIcon from "../assets/svg/OrderIcon"
import LanguageIcon from "../assets/svg/Language"
import NotificationIcon from "../assets/svg/NotificationIcon"
import ContactUsIcon from "../assets/svg/ContactUsIcon"
import HelpIcon from "../assets/svg/QuestionIcon"
import PrivacyIcon from "../assets/svg/PrivacyIcon"
import SettingIcon from "../assets/svg/SettingIcon"
import LogoutIcon from "../assets/svg/LogoutIcon"
interface ProfileScreenProps {
  onBack?: () => void
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const menuItems = [
    {
      icon:<LocationIcon width={24} height={24}/>,
      title: "Address",
      subtitle: "Manage your saved address",
    },
    {
      icon:<OrderIcon width={24} height={24}/>,
      title: "Order History",
      subtitle: "View your past orders",
    },
    {
      icon:<LanguageIcon width={24} height={24}/>,
      title: "Language",
      subtitle: "",
    },
    {
      icon: <NotificationIcon width={24} height={24}/>,
      title: "Notifications",
      subtitle: "",
    },
  ]

  const menuItems2 =[
    {
      icon:<ContactUsIcon width={24} height={24}/>,
      title: "Contact Us",
      subtitle: "",
    },
    {
      icon:<HelpIcon width={24} height={24}/>,
      title: "Get Help",
      subtitle: "",
    },
    {
      icon:<PrivacyIcon width={24} height={24}/>,
      title: "Privacy Policy",
      subtitle: "",
    },
    {
      icon:<SettingIcon width={24} height={24}/>,
      title: "Settings",
      subtitle: "",
    },
    {
      icon:<LogoutIcon width={24} height={24}/>,
      title: "Log Out",
      subtitle: "",
    },
  ]

  const renderMenuItem = (item: any, index: number) => (
    <TouchableOpacity key={index} style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        {item.icon}  {/* <-- render your SVG here */}
        <View style={styles.menuItemText}>
          <Text style={[styles.menuItemTitle,item.title === 'Log Out' ? styles.logoutText : styles.menuItemTitle]}>{item.title}</Text>
          {item.subtitle ? (
            <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
          ) : null}
        </View>
      </View>
      {item.title === 'Log Out' ? null : <Icon name="chevron-forward" size={20} color="#B0B0B0" />}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFEDE8" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.headerRight}>
          <Icon name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: "https://in.images.search.yahoo.com/search/images;_ylt=Awr1UaNmtKtoKQIA.wO7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Nj?type=E210IN885G0&p=imaegs&fr=mcafee&th=315&tw=474&imgurl=https%3A%2F%2Fi0.wp.com%2Fpicjumbo.com%2Fwp-content%2Fuploads%2Fbeautiful-nature-mountain-scenery-with-flowers-free-photo.jpg%3Fw%3D2210%26quality%3D70&rurl=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-mountain-scenery-with-flowers%2F&size=409KB&name=Beautiful+Nature+Mountain+Scenery+with+Flowers+Free+Stock+Photo+%7C+picjumbo&oid=1&h=1473&w=2210&turl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.Mvcr0QDsGXOx29cSBfXd6AHaE7%3Fpid%3DApi&tt=Beautiful+Nature+Mountain+Scenery+with+Flowers+Free+Stock+Photo+%7C+picjumbo&sigr=i9WsaQE8_Dpx&sigit=sLDQJckM7CDv&sigi=ZOTAUYfw2glF&sign=AMi3kh5rYGF0&sigt=AMi3kh5rYGF0",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>Olivia</Text>
            <Text style={styles.profileEmail}>olivia@gmail.com</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <EditIcon width={23} height={23}/>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>{menuItems.map((item, index) => renderMenuItem(item, index))}</View>
      <View style={styles.menuContainer}>{menuItems2.map((item, index) => renderMenuItem(item, index))}</View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEDE8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 28,
    color: "black",
    fontFamily: "Inter_18pt-SemiBold",
  },
  headerRight: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profileSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 20,
    paddingHorizontal: 24,
    paddingVertical: 13,
    marginBottom: 20,

  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    color: "#070707",
    fontFamily: "Inter_18pt-Regular",
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 12,
    color: "#070707",
    fontFamily: "Inter_18pt-Regular",
  },
  editButton: {
    padding: 8,
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 20,
    marginHorizontal: 20,

  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "#F5F5F5",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemText: {
    marginLeft: 15,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    color: "#070707",
    fontFamily: "Inter_18pt-Regular",
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: "#8E8E8E",
    fontFamily: "Inter_18pt-Regular",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    marginHorizontal: 20,

  },
  logoutText: {
    fontSize: 16,
    color: "#FF3B30",
    fontFamily: "Inter_18pt-Regular",
    // marginLeft: 8,
  },
})

export default ProfileScreen
