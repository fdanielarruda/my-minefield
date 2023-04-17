import { StyleSheet } from "react-native";

const css = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    textPage: {
        backgroundColor: 'orange',
        padding: 20
    },

    gamePage: {
        width: '100%',
        padding: 20,
        maxHeight: '90%',
        flexDirection: 'row', 
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },

    gameField: {
        backgroundColor: '#DCDCDC',
        height: 35,
        width: 35,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    disabledField: {
        backgroundColor: 'white'
    },

    textField: {
        fontSize: 20,
        fontWeight: "bold"
    },

    infoBar: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 20
    },

    infoBarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white"
    },

    newGameBar: {
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: 20,
        backgroundColor: "black",
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonNewGame: {
        padding: 10,
        backgroundColor: "#6d49a5",
        borderRadius: 10,
        width: "60%",
        alignItems: "center",
        justifyContent: "center"
    },

    textNewGame: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },

    buttonBackGame: {
        backgroundColor: "red",
        marginTop: 15
    }
});

export { css }