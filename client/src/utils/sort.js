class SortService {
    mostRecentPost = (data) => {
        const sorted = data.sort((a,b)=>(a.date<b.date) ? 1 : -1);
        return sorted;
    }
}


export default new SortService