import { Button, Pressable, Text, View } from "react-native";
import { css } from '../assets/css/Css';
import { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";

import FieldGame from "../components/FieldGame";
import Gif from 'react-native-gif';

const numberOfFields = 8;
const numberOfBombs = 10;

export default function Game() {
    // BOMBAS DO JOGO
    const [guardBombs, setGuardBombs] = useState([]);

    // MAPA COMPLETO COM BOMBAS E VIZINHOS
    const [fields, setFields] = useState([]);

    // VERIFICA SE O JOGO ESTÁ RODANDO    
    const [runningGame, setRunningGame] = useState(true);

    const [message, setMessage] = useState(false);
    const [win, setWin] = useState(false);

    const [stopwatch, setStopwatch] = useState(0);
    const [countFlags, setCountFlags] = useState(0);

    useEffect(() => {
        startGame();
    }, [])

    const startGame = () => {
        setStopwatch(0);
        setMessage(false);
        setWin(false);
        setRunningGame(true);

        let array = [];

        while (array.length < numberOfBombs) {
            let rowBomb = Math.floor(Math.random() * (numberOfFields - 1));
            let colBomb = Math.floor(Math.random() * (numberOfFields - 1));

            if (!checkInBombs(rowBomb, colBomb, array))
                array.push([rowBomb, colBomb]);
        }

        let fieldsStart = [];

        for (let i = 0; i < numberOfFields; i++) {
            let rowFields = [];

            for (let j = 0; j < numberOfFields; j++) {
                if (!checkInBombs(i, j, array))
                    rowFields.push({ visible: false, value: validateAround(i, j, array), flag: false });
                else
                    rowFields.push({ visible: false, value: "b", flag: false });
            }

            fieldsStart.push(rowFields);
        }

        setGuardBombs(array);
        setFields(fieldsStart);
    }

    const checkInBombs = (row, col, array = guardBombs) => {
        if (row >= 0 && col >= 0 && row < numberOfFields && col < numberOfFields) {
            let isExists = array.filter(e => e[0] === row && e[1] === col);
            if (isExists.length > 0) return true;
        }

        return false;
    }

    const clickField = (row, col) => {
        if (runningGame) {
            let fieldsUpdate = [...fields];

            if (!fieldsUpdate[row][col].flag) {
                fieldsUpdate[row][col].visible = true;

                if (fieldsUpdate[row][col].value === "b") {
                    setRunningGame(false);
                    setMessage(true);
                }

                else if (fieldsUpdate[row][col].value === 0) {
                    openNulls(row, col);
                }

                setFields(fieldsUpdate);
            }
        }
    }

    const openNulls = (row, col) => {
        let fieldsUpdate = [...fields];
        let i = 1;

        openNullsField(fieldsUpdate, row - i, col - i);
        openNullsField(fieldsUpdate, row - i, col + 0);
        openNullsField(fieldsUpdate, row - i, col + i);
        openNullsField(fieldsUpdate, row + 0, col - i);
        openNullsField(fieldsUpdate, row + 0, col + i);
        openNullsField(fieldsUpdate, row + i, col - i);
        openNullsField(fieldsUpdate, row + i, col + 0);
        openNullsField(fieldsUpdate, row + i, col + i);
    }

    const openNullsField = (fields, row, col) => {

        if (row >= 0 && col >= 0 && row < numberOfFields && col < numberOfFields) {

            if (!fields[row][col].visible && fields[row][col].value != "b" && !fields[row][col].flag) {

                fields[row][col].visible = true;

                setFields(fields);
            }
        }
    }

    const validateAround = (row, col, array = guardBombs) => {
        let count = 0;

        if (checkInBombs(row - 1, col + 0, array)) count++;
        if (checkInBombs(row - 1, col + 1, array)) count++;
        if (checkInBombs(row - 1, col - 1, array)) count++;

        if (checkInBombs(row + 1, col + 0, array)) count++;
        if (checkInBombs(row + 1, col + 1, array)) count++;
        if (checkInBombs(row + 1, col - 1, array)) count++;

        if (checkInBombs(row + 0, col - 1, array)) count++;
        if (checkInBombs(row + 0, col + 1, array)) count++;

        return count;
    }

    const markFlagInField = (row, col) => {
        if (runningGame) {
            let fieldsUpdate = [...fields];

            if (!fieldsUpdate[row][col].visible) {
                if (!fieldsUpdate[row][col].flag && countFlags >= numberOfBombs)
                    return 0;

                fieldsUpdate[row][col].flag = !fieldsUpdate[row][col].flag;
                setFields(fieldsUpdate);
            }
        }
    }

    const resetPage = () => {
        startGame();
    }

    useEffect(() => {
        // setTimeout(() => {
        if (runningGame) setStopwatch(stopwatch + 1)
        // }, 1000)
    }, []);

    useEffect(() => {
        let count = 0;
        let countHide = 0;

        fields.map(r => {
            r.map(c => {
                if (c.flag) count++;
                if (!c.visible) countHide++;
            })
        });

        setCountFlags(count);

        if (countHide <= numberOfBombs) {
            setRunningGame(false);
            setWin(true);
        }
    }, [fields])

    return (
        <>
            <View style={css.infoBar}>
                <Text style={css.infoBarText}>Bombas Restantes: {numberOfBombs - countFlags}</Text>
                <Text style={css.infoBarText}>Tempo: {stopwatch}</Text>
            </View>

            <View style={css.gamePage}>

                {/* INTERAÇÃO COM O JOGO */}
                {fields.map((row, irow) => {
                    return (
                        <View key={`row_${irow}`}>
                            {row.map((col, icol) =>
                                <TouchableHighlight
                                    key={`touch_row_${irow}_col_${icol}`}
                                    onPress={() => clickField(irow, icol)}
                                    onLongPress={() => { markFlagInField(irow, icol) }}
                                    activeOpacity={0.3}
                                >
                                    <FieldGame
                                        irow={irow}
                                        icol={icol}
                                        fields={fields}
                                        runningGame={runningGame}
                                    />
                                </TouchableHighlight>
                            )}
                        </View>
                    )
                })}
            </View>

            {message || win ?
                <View style={css.newGameBar}>
                    {
                        message ?
                            <Gif
                                source={{ uri: 'https://gifs.eco.br/wp-content/uploads/2022/08/gifs-de-bombas-0.gif' }}
                                style={{ width: "100%", minHeight: 300 }}
                            />
                            : null
                    }

                    {
                        win ?
                            <Gif
                                source={{ uri: 'https://media.tenor.com/RtK5tk0Bj1sAAAAC/sjaak-afhaak-glory.gif' }}
                                style={{ width: "100%", minHeight: 300 }}
                            />
                            : null
                    }


                    <Pressable style={css.buttonNewGame} onPress={resetPage}>
                        <Text style={css.textNewGame}>NOVO JOGO</Text>
                    </Pressable>

                    <Pressable
                        style={[css.buttonNewGame, css.buttonBackGame]}
                        onPress={() => { setMessage(false); setWin(false) }}
                    >
                        <Text style={css.textNewGame}>VOLTAR</Text>
                    </Pressable>
                </View>
                : null}

            {!message && !win && !runningGame ?
                <Pressable style={css.buttonNewGame} onPress={resetPage}>
                    <Text style={css.textNewGame}>NOVO JOGO</Text>
                </Pressable>
                : null}
        </>
    );
}