import { Text } from "react-native";

import styles from "./styles";

const CustomText = ({ children = "", customStyle = {}, ...props }) => {
    return (
        <Text {...props} style={[styles.fontFamily, customStyle]}>
            {children}
        </Text>
    );
};

export default CustomText;
