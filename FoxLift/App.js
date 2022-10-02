import React from "react";
import {Text, Image, View, ScrollView, StyleSheet, SafeAreaView, Button, Alert} from "react-native";


export default function Launch () {
  return (
    <SafeAreaView>
        <SafeAreaView>
				<Image style = {stylesheet.styleImage1} source = {require("./images/FoxLift-1.png")} />
				<Image style = {stylesheet.styleImage3} source = {require("./images/googleButton.png")} />
				<Image style = {stylesheet.styleImage2} source = {{uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/4M4lqady9IW4Adm4wKJB2VTP.png"}}/>
				</SafeAreaView>
				<Button
               onPress={() => {}}
               title="Press Me"
             />
        <View style = {stylesheet.styleWrapButton}>
					<View style = {stylesheet.styleButton}>
						<Text style = {stylesheet.styleText}>
							{`Login`}
						</Text>
					</View>
				</View>
				<View style = {stylesheet.styleWrapButtonCopy1}>
					<View style = {stylesheet.styleButtonCopy1}>
						<Text style = {stylesheet.styleTextCopy1}>
							{`Register`}
						</Text>
					</View>
				</View>
		</SafeAreaView>
  )
}

function Home()
{
	return (
		<SafeAreaView>
			<SafeAreaView>
					<Image style = {stylesheet.styleImage1} source = {require("./images/FoxLift-1.png")} />
					<Image style = {stylesheet.styleImage3} source = {require("./images/googleButton.png")} />
					<Image style = {stylesheet.styleImage2} source = {{uri: "https://nyc3.digitaloceanspaces.com/sizze-storage/media/images/4M4lqady9IW4Adm4wKJB2VTP.png"}}/>
					</SafeAreaView>
	
			<View style = {stylesheet.styleWrapButton}>
						<View style = {stylesheet.styleButton}>
							<Text style = {stylesheet.styleText}>
								{`Logi`}
							</Text>
						</View>
					</View>
					<View style = {stylesheet.styleWrapButtonCopy1}>
						<View style = {stylesheet.styleButtonCopy1}>
							<Text style = {stylesheet.styleTextCopy1}>
								{`Register`}
							</Text>
						</View>
					</View>
			</SafeAreaView>
	  )
}

const stylesheet = StyleSheet.create({
 	styleImage1: {
		position: "absolute",
		alignContent: "center",
		right: 30,
		top: 30,
		borderRadius: 0,
		width: 400,
		height: 200,
	},
	styleImage2: {
		position: "absolute",
		alignContent: "center",
		left: 60,
		top: 650,
		borderRadius: 0,
		width: 284,
		height: 142,
	},
	styleImage3: {
		position: "absolute",
		alignContent: "center",
		top: 450,
		borderRadius: 0,
		width: 250,
		height: 30,
	},
	styleText: {
		flexBasis: 0,
		flexGrow: 1,
		width: "auto",
		color: "rgba(249, 249, 249, 1)",
		fontSize: 16,
		fontFamily: "SFProDisplay_400Regular",
		letterSpacing: -0.5,
		fontStyle: "normal",
		fontWeight: "500",
		textAlign: "center",
		height: "auto",
		lineHeight: 18.8,
	},
	styleButton: {
		width: "100%",
		height: "auto",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 12,
		borderRadius: 10,
		backgroundColor: "red",
	},
	styleWrapButton: {
		position: "absolute",
		left: 0.3571428571428896,
		right: -0.3571428571428896,
		top: 388.42857142857116,
		width: "auto",
		height: "auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 12,
		paddingRight: 16,
		paddingBottom: 12,
		paddingLeft: 16,
	},
	styleTextCopy1: {
		flexBasis: 0,
		flexGrow: 1,
		width: "auto",
		color: "rgba(249, 249, 249, 1)",
		fontSize: 16,
		fontFamily: "SFProDisplay_400Regular",
		letterSpacing: -0.5,
		fontStyle: "normal",
		fontWeight: "500",
		textAlign: "center",
		height: "auto",
		lineHeight: 18.8,
	},
	styleButtonCopy1: {
		width: "100%",
		height: "auto",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 12,
		borderRadius: 10,
		backgroundColor: "red",
	},
	styleWrapButtonCopy1: {
		position: "absolute",
		left: 0.3571428571428896,
		right: -0.3571428571428896,
		top: 321.4285714285712,
		width: "auto",
		height: "auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 12,
		paddingRight: 16,
		paddingBottom: 12,
		paddingLeft: 16,
	},
	styleFindNearYou: {
		position: "absolute",
		left: 16,
		top: 16,
		width: 345,
		color: "rgba(255, 69, 69, 1)",
		fontSize: 48,
		fontFamily: "Arial",
		letterSpacing: -0.09000000357627869,
		fontStyle: "normal",
		fontWeight: "700",
		textAlign: "center",
		height: "auto",
		lineHeight: 48,
	},
	stylePreset: {
		position: "absolute",
		left: 1.7142857142857792,
		right: -1.7142857142857792,
		top: 208.00000000000006,
		width: "auto",
		height: "auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: "rgba(255, 255, 255, 1)",
	},

});