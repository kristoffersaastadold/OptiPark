import {createStackNavigator, createAppContainer} from 'react-navigation';
import DefaultContainer from '../components/DefaultContainer';
import Main from '../components/Main';

const MainNavigator = createStackNavigator({
    Login: {screen: DefaultContainer},
    Main: {screen:Main},
},{
})

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;