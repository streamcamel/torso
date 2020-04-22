import React, { useEffect, useState, useContext } from 'react';
import * as appConfig from '../config'
import CompanyTile from './CompanyTile'
import GameTile from './GameTile'
import GamePage from './GamePage'
import MainChart from './MainChart'
import CommandContext from '../contexts/CommandContext'


const Companies = (props) => {
    const [options, setOptions] = useState({mode:'companies', data:''});
    const [data, setData] = useState([]); // Data state for the companies/games
    const [title, setTitle] = useState('Top Companies'); 
    const [lastCommand, setLastCommand] = useState(0);

     const commandContext = useContext(CommandContext);

    const onCompanyTileClick = (data) => {
        console.log('a COMPANY child was clicked')
        setOptions({mode:'singlecompany', data:data})
        setTitle(data.name + "'s Top Games");
        setData([]);
    }

    const onGameTileClick = (data) => {
        console.log('a GAME child was clicked')
        setOptions({mode:'game', data:data})
        setTitle(data.name)
    }
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        console.log('useEffect')

        if(lastCommand !== commandContext.commandID) {
            console.log("GOT A COMMAND")
            setData([]);
            setLastCommand(commandContext.commandID);

            switch(commandContext.command) {
                case 'reset':
                    setOptions({mode:'companies', data:''})
                    break;
                case 'search':
                    setOptions({mode:'companies', data:commandContext.commandData})
                    break;
            }
        }
        else
        {   
            let url = '';

            if(options.mode === 'companies') {
                
                if(options.data === '') {
                    setTitle('Top Company');
                    url = appConfig.backendURL('/top_companies?period=1w');
                } else {
                    setTitle('Search Results');
                    url = appConfig.backendURL('/search_companies?q=' + options.data);
                }

            } else if(options.mode === 'singlecompany') {
                url = appConfig.backendURL('/top_games?company='+options.data.slug);
            }

            console.log('fecting : ' + url)

            if(url !== '') {
                fetch(url)
                .then(res => res.json())
                .then(res => setData(res))
            }
        }
    }, [options.mode, options.data, commandContext]);
    // }, [options.mode, options.data, props.command.commandID]);
    
    console.log('COMPANIES : ' + options.mode)
    console.log(props)
    console.log(options)
    console.log(data) 
    console.log(commandContext)


    let tileGrid = null;
    let singlePage = null;

    if(options.mode === 'companies') {
        let tiles = [];
        data.forEach(acompany => {
            let key = 'companykey'+lastCommand+'-'+acompany.id
            tiles.push(
                <CompanyTile key={key} company={acompany} onClick={onCompanyTileClick} />
            );
        });
        tileGrid = <div className="CompaniesGrid"> {tiles} </div>

    } else if (options.mode === 'singlecompany') {
        let tiles = []
        data.forEach(agame => {
            let key = 'gamekey'+lastCommand+'-'+agame.game_id
            tiles.push(
                <GameTile key={key} game={agame} onClick={onGameTileClick} />
            );
        });
        tileGrid = <div className="CompaniesGrid"> {tiles} </div>

    } else if (options.mode === 'game') {
        singlePage = <GamePage game={options.data} />
    }

    return (
        <div className="companies">
            <MainChart options={options} />
            <h2 className="SectionTitle">{title}</h2>
            {tileGrid}
            {singlePage}
        </div>
    );
};

export default Companies;