import _ from 'lodash';
import React, {useState} from 'react';
import { Search, Grid, Header } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_TAGS } from '../../utils/queries';
import { Container } from 'semantic-ui-react';
import SoundsbyTagSlides from './sounds-search-slides';
import SmallSoundsbyTagSlides from './small-sound-slides';

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

function SoundSearch(props) {
    const {soundData} = props;
    const {loading, data} = useQuery(GET_TAGS);
    const tags = data?.tags || {};

    const [chosenTags, setChosenTags]=useState([]);

    return (
        <Container className="sound-search">
            <Header as="h2">Find Sounds by Tag</Header>
            {!loading && <TagSearch tags={tags} setChosenTags={setChosenTags}></TagSearch>}
                {chosenTags.map(item=> (
                  <Container className='chosen-tags-container' key={item.id}>
                        <Container className="chosen-tag" >
                          {window.screen.width>=540 ? (<SoundsbyTagSlides tag={item} soundData={soundData}></SoundsbyTagSlides>):(
                          <SmallSoundsbyTagSlides tag={item} soundData={soundData}></SmallSoundsbyTagSlides>)}
                        </Container>
                  </Container >
                ))}
        </Container>
    )
}

function TagSearch(props) {
    const {
        tags,
        setChosenTags
    }=props;

  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const { loading, results, value } = state

  const tagData=tags;

  const source = [];

  const handleSelection = (data) => {
    setChosenTags([data.result]);

    dispatch({ type: 'CLEAN_QUERY' });
  };

  for (let x=0;x<tagData.length;x= x+1){
    let newsourcedata={title:tagData[x].name, key:tagData[x]._id, id: tagData[x]._id}
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
        <Search id="tags-search"
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
      </Grid.Column>
    </Grid>
  )
}

export default SoundSearch;