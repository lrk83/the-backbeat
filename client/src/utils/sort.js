import moment from "moment";

class SortService {
    mostRecentPost = (data) => {
        const sorted = data.sort((a,b)=>(moment(a.date).from(moment[2021, 6, 20],true).split(' ')<moment(b.date).from(moment[2021, 6, 20],true).split(' ')) ? 1 : -1);
        return sorted;
    }

    mostPopularPost = (data) => {
        const sorted = data.sort((a,b)=>(a.followerCount<b.followerCount) ? 1 : -1);
        return sorted;
    }

    formatSkillsForSearch = (data) => {
        var formatedData=[];
        for(let x=0;x<data.length;x=x+1){
            var newFormatedData={title:data[x].name,description:data[x].description,image:data[x].image}
            formatedData.push(newFormatedData);
        }

        return formatedData;
    }

    recomendedByTags = (skilldata, userdata) => {

        var formatedData =[];
        for (let x=0;x<skilldata.length;x++){
            for (let y=0;y<skilldata[x].tags.length; y++){
                for (let z=0;z<userdata.followedTags.length;z++){
                    if (skilldata[x].tags[y]._id===userdata.followedTags[z]._id){
                        formatedData.push(skilldata[x]);
                    }
                }
            }
            for (let y=0;y<skilldata[x].aditionalTags.length; y++){
                for (let z=0;z<userdata.followedTags.length;z++){
                    if (skilldata[x].aditionalTags[y]._id===userdata.followedTags[z]._id){
                        formatedData.push(skilldata[x]);
                    }
                }
            }
        }

        return formatedData;

    }

    formatSoundsAndTags = (soundData, tag) => {

            var formattedSounds=[];
            for(let x=0;x<soundData.length;x++){
                for(let y=0;y<soundData[x].tags.length;y++){
                    if (soundData[x].tags[y]._id===tag.id){
                        for(let z=0;z<formattedSounds.length;z++){
                            if (soundData[x]._id!=formattedSounds[z]._id){
                                formattedSounds.push(soundData[x]);
                            }
                        }
                    }
                }

                for(let y=0;y<soundData[x].aditionalTags.length;y++){
                    if (soundData[x].aditionalTags[y]._id===tag.id){
                        for(let z=0;z<formattedSounds.length;z++){
                            if (soundData[x]._id!=formattedSounds[z]._id){
                                formattedSounds.push(soundData[x]);
                            }
                        }
                    }
                }
                    
            }
            return formattedSounds;
    }

    BackBeatFavoriteSounds = (skilldata) => {
        var returndata = [];
        for(let x=0;x<skilldata.length;x++){
            returndata.push(skilldata[x]);
        }

        return returndata;
    }
}


export default new SortService();