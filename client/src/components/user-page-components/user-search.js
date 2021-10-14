import _ from 'lodash';
import React from 'react';
import { Search, Grid, Header } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';

const initialState = {
  loading: false,
  results: [],
  value: '',
}

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

function UserSearch(props) {
    const {userData} = props;

    return (
        <Container className="sound-search">
            <Header as="h2">Search Users</Header>
            <SearchBar users={userData}></SearchBar>
        </Container>
    )
}

function SearchBar(props) {
    const {
        users
    }=props;

  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const { loading, results, value } = state

  const userData=users;

  const source = [];

  const handleSelection = (data) => {
    var userID=data.result.id;

    console.log(userID);

    window.location.assign(`/users/single-user/${userID}`);

    dispatch({ type: 'CLEAN_QUERY' });
  };

  for (let x=0;x<userData.length;x= x+1){
    let newsourcedata={title:userData[x].username, key:userData[x]._id, id: userData[x]._id,image:userData[x].image}
    source.push(newsourcedata);
  };

  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')

      const isMatch = (result) => re.test(result.title)

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch),
      })
    }, 300)
  }, [])
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Grid>
      <Grid.Column>
        <Search className="down-search"
            id="user-search"
          placeholder="search for users"
          loading={loading}
          onResultSelect={(e, data) => {
            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title });
            handleSelection(data) }
          }
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </Grid.Column>
    </Grid>
  )
}

export default UserSearch;