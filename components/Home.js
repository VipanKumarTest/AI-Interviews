import React from 'react'
import { ScrollView } from 'react-native-virtualized-view';
import TopBar from './Topbar'
import Banner from './Banner';
import InterviewHistory from './InterviewHistory';
import SavedInterviews from './SavedInterviews';


const Home = () => {
    return (
        <ScrollView>
            <TopBar />
            <Banner />
            <InterviewHistory />
            <SavedInterviews />
        </ScrollView>
    )
}

export default Home