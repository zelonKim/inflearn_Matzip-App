import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { createContext, PropsWithChildren, ReactNode, useContext } from 'react';
import {GestureResponderEvent, Modal, ModalProps, Pressable, PressableProps, SafeAreaView, StyleSheet, Text, View} from 'react-native';


interface OptionContextValue {
    onClickOutSide?: (event: GestureResponderEvent) => void;
}

const OptionContext = createContext<OptionContextValue| undefined>(undefined)




interface OptionMainProps extends ModalProps {
    children: ReactNode;
    isVisible: boolean;
    hideOption: () => void;
    animationType?: ModalProps('animationType')
}


function OptionMain({children, isVisible, hideOption, animateType='slide', ...props}: OptionMainProps) {

    const onClickOutSide = (event: GestureResponderEvent) => {
        if(event.target === event.currentTarget) {
            hideOption();
        }
    }

    return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animateType}
      onRequestClose={hideOption}
      {...props}
      >
        <OptionContext.Provider value={{onClickOutSide}}>
            {children}
        </OptionContext.Provider>
    </Modal>
  );
}


function Background({children}:PropsWithChildren) {
    const optionContext = useContext(OptionContext)

    return (
        <SafeAreaView style={styles.optionBackground} onTouchEnd={optionContext?.onClickOutSide}>
            {children}
        </SafeAreaView>
    )
}



function Container({children}:PropsWithChildren) {
    return <View style={styles.optionContainer}>{children}</View>
}


interface ButtonProps extends PressableProps {
    children: ReactNode;
    isDanger?: boolean;
    isChecked?: boolean;
}

function Button({children, isDanger=false, isChecked=false, ...props}):ButtonProps {
    const {theme} = useThemeStore();
    const styles = styling(theme);
    
    return(
        <Pressable style={({pressed}) => [
            pressed && styles.optionButtonPressed,
            styles.optionButton,
        ]} {...props}>
            <Text style={[styles.optionText, isDanger && styles.dangerText]}>{children}</Text>
            {isChecked && <Ionicons name='checkmark' size={20} color={colors.BLUE_500} />}
        </Pressable>
    )
}



function Title({children}: PropsWithChildren) {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}></Text>
        </View>
    )
}



function Divider() {
    return <View style={styles.border} />
}





interface CheckBoxProps extends PressableProps {
    children: ReactNode;
    icon?: ReactNode;
    isChecked?: boolean;
}

function CheckBox({children, icon, isChecked=false, ...props}:CheckBoxProps) {
    return (
    <Pressable style={({pressed}) => [
        pressed ? styles.optionButtonPressed,
        styles.checkBoxContainer,
    ]}> 
    <Ionicons 
        name={`checkmark-circle${isChecked ? '' : '-outline'}`}
        size={22}
        color={colors[theme].BLUE_500}
    />
        {icon}
        <Text style={styles.checkBoxText}> {children} </Text>
    </ Pressable>
)
}



interface FilterProps extends PressableProps {
    children: ReactNode;
    isSelected?: boolean;
}

function Filter({children, isSelected, ...props}:FilterProps) {
    return (
        <Pressable style={styles.filterContainer} {...props} >
            <Text style={isSelected ? styles.filterSelectedText : styles.filterText}>{children}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={22} color={isSelected ? colors[theme].BLUE_500 : colors[theme].GRAY_300} />
        </Pressable>
    )
}




export const CompoundOption = Object.assign(OptionMain, {
    Container,
    Button,
    Title,
    Divider,
    Background,
    CheckBox,
    Filter
})




const styles = StyleSheet.create({
    optionBackground: {
        flex:1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0 0 0 /0.5)',
    },
    optionContainer: {
        borderRadius: 15,
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: colors.GRAY_100,
        overflow: 'hidden',
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        gap: 5,
    },
    optionButtonPressed: {
        backgroundColor: colors.GRAY_200
    },
    optionText: {
        fontSize: 17,
        color: colors.BLUE_500,
        fontWeight: '500',
    },
    dangerText: {
        color: colors.RED_500
    },
    titleContainer: {
        alignItems: 'center',
        padding: 15,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.BLACK
    },
    border: {
        borderBottomColor: colors.GRAY_200,
        borderBottomWidth: 1
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItesm: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        gap: 10,
    },
    checkBoxText: {
        color: colors[theme].BLACK,
        fontSize: 15,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 5
    },
    filterText: {
        color: colors[theme].GRAY_300,
        fontSize: 15,
        fontWeight: '500',
    },
    filterSelectedText: {
        color: colors[theme].BLUE_500,
        fontSize: 15,
        fontWeight: '500',
    }
})
