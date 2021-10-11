import _ from 'lodash';
import faker from "faker";
import React, {useState, useEffect} from 'react';
import { Search, Header } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_SKILLS_FOR_SUGGESTED } from '../../utils/queries';
import Sort from "../../utils/sort";

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
  
  function SearchExampleStandard(data) {

    var source = [];
    
    for (let x=0; x<data.data.length;x++){
        const newSkillSearchData=data.data[x];
        source.push(newSkillSearchData);
    }

    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loading, results, value } = state
  
    const timeoutRef = React.useRef()
    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })
    
        timeoutRef.current = setTimeout(() => {
          if (data.value.length === 0) {
            dispatch({ type: 'CLEAN_QUERY' })
            return
          }

          console.log(source);
    
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
          <Search
            loading={loading}
            onResultSelect={(e, data) =>
              dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
            }
            onSearchChange={handleSearchChange}
            results={results}
            value={value}
          />
    )
  }
  
  export default SearchExampleStandard