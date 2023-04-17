import { Text, View } from "react-native";
import { css } from '../assets/css/Css';
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FieldGame({ irow, icol, fields, runningGame }) {
    const [color, setColor] = useState({ color: 'black' });
    const [text, setText] = useState("");

    const result = fields[irow][icol];

    useEffect(() => {
        if (!runningGame && result.value === "b") {
            setText(<Icon name="bomb" size={22} color="#DD0000" />);
        } else if (result.visible) {
            if (result.value === "b") {
                setText(<Icon name="bomb" size={22} color="#FF0000" />);
            } else if (result.value > 0) {
                setText(result.value);
                setColor({ color: 'blue' });
            } else {
                setText("");
            }
        } else {
            setText("");
            setColor({ color: 'black' });

            if (result.flag) setText(<Icon name="flag" size={22} color="#32CD32" />);
        }
    }, [fields]);

    return (
        <View
            key={`col_${icol}`}
            style={[css.gameField, result.visible ? css.disabledField : '', { ...color }]}
        >
            <Text style={[css.textField, { ...color }]}>
                { text === 0 ? "" : text }
            </Text>
        </View>
    );
}