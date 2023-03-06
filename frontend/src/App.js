import React from 'react';
import { Route } from 'react-router-dom';
import CoffeeApp from './components/CoffeeApp/CoffeeApp';


function App() {
  // const [loaded, setLoaded] = useState(false);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   (async () => {
  //     await dispatch(authenticate());
  //     setLoaded(true);
  //   })();
  // }, [dispatch]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <Route path="/" exact={true}>
      <CoffeeApp />
    </Route>
  );
}

export default App;
