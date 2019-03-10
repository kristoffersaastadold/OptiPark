
import {createStackNavigator, createAppContainer} from 'react-navigation';
import DefaultContainer from '../components/DefaultContainer';
import Main from '../components/Main';



const MainNavigator = createStackNavigator({
    Login: {screen: DefaultContainer},
    Main: {screen:Main},
},{
    headerMode:'none'
})

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator