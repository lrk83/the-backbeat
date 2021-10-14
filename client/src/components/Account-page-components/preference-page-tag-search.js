import _ from 'lodash'
import React from 'react'
import { Search, Grid, Container } from 'semantic-ui-react'

const initialState = {
  loading: false,
  results: [],
  value: '',
};

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
  };
};

function TagSearch(props) {
  
  const {tags} = props

  if (localStorage.getItem("preferenceTags")===null){
    localStorage.setItem("preferenceTags", JSON.stringify([]));
  };

  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const tagData=tags;

  const source = [];

  const handleSelection = (data) => {
    const updatedTags = JSON.parse(localStorage.getItem("preferenceTags"));

    updatedTags.push(data.result);

    localStorage.setItem("preferenceTags",JSON.stringify(updatedTags));

    dispatch({ type: 'CLEAN_QUERY' });
  };

  for (let x=0;x<tagData.length;x= x+1){
    let newsourcedata={title:tagData[x].name, key:tagData[x]._id, id: tagData[x]._id}
    source.push(newsourcedata);
  };

  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      };

      const re = new RegExp(_.escapeRegExp(data.value), 'i');

      const isMatch = (result) => re.test(result.title);

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch),
      });
    }, 300);
  }, [source]);

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return (
    <Grid>
      <Grid.Column>
        <Search className="down-search"
        id="tags-search"
          placeholder="search for tags"
          loading={loading}
          onResultSelect={(e, data) => {
            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title });
            handleSelection(data) }
          }
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
        <Container className='chosen-tags-container'>
          {JSON.parse(localStorage.getItem("preferenceTags")).map(item=> (
            <div className="preference-tags" key={item.id} >
              {item.title}</div>
            ))}
        </Container >
      </Grid.Column>
    </Grid>
  )
}

export default TagSearch;