import React, {useCallback, useEffect, useRef, useState} from 'react';
import Ably from 'ably/promises';
import {useLocation} from "react-router-dom";
import {Box, Button, Center, Column, Image, Input, Modal, Row, SimpleGrid, Text} from "native-base";
import '../App.css';

const SongChooser = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState({});
    const [data, setData] = useState([]);

    const ref = useRef(null);


    const search = useCallback(async (q) => {
        console.log({q})
        if (q) {
            try {

                const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAkCIUlOqN_OE5Q9NXYIVbX4pzr01PRrRU&q=${q}&part=snippet&maxResults=12`;

                const response = await fetch(apiUrl);
                const responseData = await response.json();
                setData(responseData.items);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

    }, []);


    const handleAddVideo = (id) => {
        // Your logic to add the video to the playlist here

        // Create an Ably client to send the message
        const ably = new Ably.Realtime('NnUQBw.0sZMLw:cvvm_qE4voRWPBrO4NTy1HHQkanRJYCnffueJaOo-yU');
        const channel = ably.channels.get('playlist_channel');


        // Send the video URL as a message to Ably
        channel.publish('message', id);
    };

    //region

    // const data = [
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "avzJm241EdXZZ90M3cUG3cN8WUQ",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "rg6CiPI6h2g"
    //         },
    //         "snippet": {
    //             "publishedAt": "2016-01-17T13:41:24Z",
    //             "channelId": "UCzNm0QQc1rBHFQ_eGMFG_Ug",
    //             "title": "Pokémon Theme Song (Music Video)",
    //             "description": "Pokémon (Anime Series) Music Video Music: Pokémon Theme Song by Jason Paige Anime: Pokémon Directed by: Kunihiko ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/rg6CiPI6h2g/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/rg6CiPI6h2g/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/rg6CiPI6h2g/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "kerwinpogi092",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2016-01-17T13:41:24Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "tudf9JHvR_IDNNILI4UJlcNucsM",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "ozw7u85RrrU"
    //         },
    //         "snippet": {
    //             "publishedAt": "2015-03-14T19:23:36Z",
    //             "channelId": "UCcyOpr8OMbNQTGHzOpftmvw",
    //             "title": "Pokémon Theme Song Croatia - Pokémon Hrvatska Uvodna Špica",
    //             "description": "Pokémon Theme Song Croatia Evo hrvatska verzija Pokemon pjesme.",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/ozw7u85RrrU/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/ozw7u85RrrU/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/ozw7u85RrrU/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Ante",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2015-03-14T19:23:36Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "K779nXBFrrsCxnedKpuHZSPkgjI",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "6xKWiCMKKJg"
    //         },
    //         "snippet": {
    //             "publishedAt": "2014-01-04T07:15:19Z",
    //             "channelId": "UCMzdPhimosu0P8kY6lGEIug",
    //             "title": "Pokémon Season 1: Indigo League - Opening Theme",
    //             "description": "Pokémon Season 1: Indigo League - Opening Theme Song | High Quality.",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/6xKWiCMKKJg/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/6xKWiCMKKJg/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/6xKWiCMKKJg/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "ThePokemonNetwork",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2014-01-04T07:15:19Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "FJFPgNRLjC5BF_Y8JQeft8a15UM",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "8ZR920NGGXY"
    //         },
    //         "snippet": {
    //             "publishedAt": "2011-09-22T23:28:47Z",
    //             "channelId": "UCwfraiISAvDEiaFZB5REYQg",
    //             "title": "Pokemoni - Uvodna špica",
    //             "description": "TEKST: Želim da budem najveći, kao niko do sad. Da skupim sve, da mi se posreći, njihov trener biću tad. Pokemoni vode me, još ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/8ZR920NGGXY/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/8ZR920NGGXY/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    {/*                    "url": "https://i.ytimg.com/vi/8ZR920NGGXY/hqdefault.jpg",*/
    }
    {/*                    "width": 480,*/
    }
    {/*                    "height": 360*/
    }
    {/*                }*/
    }
    {/*            },*/
    }
    {/*            "channelTitle": "bogysha",*/
    }
    {/*            "liveBroadcastContent": "none",*/
    }
    //             "publishTime": "2011-09-22T23:28:47Z"
    //         }
    //     },
    //     {
    {/*        "kind": "youtube#searchResult",*/
    }
    //         "etag": "hrBwU1KB83zEwBC1rQJBApDi9zs",
    {/*        "id": {*/
    }
    //             "kind": "youtube#video",
    //             "videoId": "FCU01Lc7a0s"
    //         },
    //         "snippet": {
    //             "publishedAt": "2013-02-09T23:46:55Z",
    //             "channelId": "UC2CrC4eOw8RzBpxIwpIkNCA",
    //             "title": "Pokemon Johto Uvodna Spica (Serbian)",
    //             "description": "Pokemon Johto Spica (Srpski) Uvodna Spica Pokemon Johto Journeys Opening / Intro (Serbian) Dub/Sinhronizacija: Studio ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/FCU01Lc7a0s/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/FCU01Lc7a0s/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/FCU01Lc7a0s/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "SerbianDub",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2013-02-09T23:46:55Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "nWMyKJvSxAocNu_zLHq5UyyKNdg",
    //         "id": {
    //             "kind": "youtube#video",
    {/*            "videoId": "7IElyW86bpo"*/
    }
    {/*        },*/
    }
    {/*        "snippet": {*/
    }
    //             "publishedAt": "2014-04-09T15:55:01Z",
    //             "channelId": "UC1g6-LYt4ebNDq0WEw1H1vQ",
    //             "title": "Pokemoni Uvodne Pjesme 1-7 sezone",
    //             "description": "Like, Koment, Sub ? Pokémon uvodne pjesme na hrvatskom. Samo tih sedam sezona je sinkronizirano, ostale nikada nisu ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/7IElyW86bpo/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/7IElyW86bpo/mqdefault.jpg",
    //                     "width": 320,
    {/*                    "height": 180*/
    }
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/7IElyW86bpo/hqdefault.jpg",
    {/*                    "width": 480,*/
    }
    {/*                    "height": 360*/
    }
    {/*                }*/
    }
    {/*            },*/
    }
    {/*            "channelTitle": "Forty Four",*/
    }
    {/*            "liveBroadcastContent": "none",*/
    }
    {/*            "publishTime": "2014-04-09T15:55:01Z"*/
    }
    {/*        }*/
    }
    {/*    },*/
    }
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "5lveicT2pkINXJlKifCUYdm_aJ0",
    //         "id": {
    {/*            "kind": "youtube#video",*/
    }
    //             "videoId": "n9veR1PWOIY"
    //         },
    //         "snippet": {
    //             "publishedAt": "2021-06-30T19:29:38Z",
    //             "channelId": "UC_Dz9ahvKKUerPlQt7isz8w",
    //             "title": "Pokémon Theme: Pokémon Journeys - 23rd Season (Croatian)",
    //             "description": "Here are the lyrics: To je velik svijet, al' znate gdje me naći Idemo skupa samo stvari na svoj način Put pod noge, jer nas čekaju ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/n9veR1PWOIY/default.jpg",
    {/*                    "width": 120,*/
    }
    {/*                    "height": 90*/
    }
    {/*                },*/
    }
    {/*                "medium": {*/
    }
    //                     "url": "https://i.ytimg.com/vi/n9veR1PWOIY/mqdefault.jpg",
    {/*                    "width": 320,*/
    }
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/n9veR1PWOIY/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "World Languages Cartoons",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2021-06-30T19:29:38Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "vZUNAxD0DOQDjSnGkCc-bwGbeo8",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "gil-xAGfN8w"
    //         },
    //         "snippet": {
    //             "publishedAt": "2012-12-26T11:35:06Z",
    //             "channelId": "UCRruIkCDDcy34LfzP38-fBQ",
    //             "title": "POKEMONI na srpskom - Uvodna špica",
    //             "description": "I dugoocekivana Srpska uvodna spica Pokemona prve sezone. Hvala na gledanju :) Nadam se da sam ispunio nekom zelju posto ...",
    {/*            "thumbnails": {*/
    }
    {/*                "default": {*/
    }
    {/*                    "url": "https://i.ytimg.com/vi/gil-xAGfN8w/default.jpg",*/
    }
    //                     "width": 120,
    {/*                    "height": 90*/
    }
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/gil-xAGfN8w/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/gil-xAGfN8w/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Pokefane",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2012-12-26T11:35:06Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "2z8KeRJI9cF4z7iHAX9tkIZ3tHk",
    {/*        "id": {*/
    }
    //             "kind": "youtube#video",
    //             "videoId": "rlK4TAl06VA"
    //         },
    {/*        "snippet": {*/
    }
    {/*            "publishedAt": "2021-08-15T20:08:11Z",*/
    }
    {/*            "channelId": "UCbJPPOP7EdT1M3NxbTwsNpg",*/
    }
    {/*            "title": "Putovanja Pokemona 2019 Uvodna Špica Na Hrvatskom ( Crtani Raj )",*/
    }
    //             "description": "Putovanja Pokemona 2019 Uvodna Špica Na Hrvatskom ( Crtani Raj ) Epizode Gledajte Ovdje https://bit.ly/3g8ddEP.",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/rlK4TAl06VA/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    {/*                    "url": "https://i.ytimg.com/vi/rlK4TAl06VA/mqdefault.jpg",*/
    }
    {/*                    "width": 320,*/
    }
    {/*                    "height": 180*/
    }
    {/*                },*/
    }
    //                 "high": {
    {/*                    "url": "https://i.ytimg.com/vi/rlK4TAl06VA/hqdefault.jpg",*/
    }
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Crtani Raj",
    {/*            "liveBroadcastContent": "none",*/
    }
    //             "publishTime": "2021-08-15T20:08:11Z"
    //         }
    {/*    },*/
    }
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "zLFoLbUwggJ4up63Eg7bJGWsf6U",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "vZ8UMq_hI28"
    //         },
    //         "snippet": {
    //             "publishedAt": "2011-08-16T21:48:19Z",
    //             "channelId": "UCT5jSXo4AKfsQFR797Bn5Lw",
    //             "title": "Pokémon - Openings 1-6 [Croatian]",
    //             "description": "Pokémon - Otvaranje 1-6 [Hrvatski] **OBS: Croatia has dubbed only six seasons.",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/vZ8UMq_hI28/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/vZ8UMq_hI28/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/vZ8UMq_hI28/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    {/*            "channelTitle": "PkmnMultiLanguage",*/
    }
    {/*            "liveBroadcastContent": "none",*/
    }
    //             "publishTime": "2011-08-16T21:48:19Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "3rbZ2P0q_BKnZCzGe2mifKACJIc",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "T4AcqLNMZEg"
    //         },
    //         "snippet": {
    //             "publishedAt": "2011-12-04T19:33:51Z",
    //             "channelId": "UCQDbM7Uhlg_N4Z9I7CZ1P6w",
    //             "title": "Pokemoni - Pjesma na Hrvatskom! ( HQ )",
    //             "description": "Uvodna pjesma pokemona.",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/T4AcqLNMZEg/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/T4AcqLNMZEg/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/T4AcqLNMZEg/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Tanja Repinac",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2011-12-04T19:33:51Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "hTUArfiHc0P8iWrR3nvIJ89TzVw",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "4Ctp2i7HTmQ"
    //         },
    //         "snippet": {
    //             "publishedAt": "2013-07-05T12:32:42Z",
    //             "channelId": "UCoG5tqzTR6szwCAoCtSehrQ",
    //             "title": "Team Rocket - Croatian Motto",
    //             "description": "Lyrics: Da zaštiti svijet od razaranja! Da obrani ljude od glupih pretvaranja! Da istinu i ljubav svi zaborave! Da stignemo do ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/4Ctp2i7HTmQ/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/4Ctp2i7HTmQ/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/4Ctp2i7HTmQ/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "Leon™",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2013-07-05T12:32:42Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "02iEoiteOMldjrKMp46IbJijDlA",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "8xxgBFYQTL4"
    //         },
    //         "snippet": {
    //             "publishedAt": "2022-07-26T19:15:00Z",
    //             "channelId": "UCFctpiB_Hnlk3ejWfHqSm6Q",
    //             "title": "Pokémon: The Johto Journeys 🌄 | Opening Theme",
    //             "description": "Swing into a whole new Pokémon world with the anime opening theme from Pokémon: The Johto Journeys! Official site: ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/8xxgBFYQTL4/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/8xxgBFYQTL4/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/8xxgBFYQTL4/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "The Official Pokémon YouTube channel",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2022-07-26T19:15:00Z"
    //         }
    //     },
    //     {
    //         "kind": "youtube#searchResult",
    //         "etag": "UpSiF9PO2TkzkiSuZDaplao_6N0",
    //         "id": {
    //             "kind": "youtube#video",
    //             "videoId": "w7XdPcOz_4w"
    //         },
    //         "snippet": {
    //             "publishedAt": "2018-04-22T13:00:45Z",
    //             "channelId": "UCFctpiB_Hnlk3ejWfHqSm6Q",
    //             "title": "Pokémon the Series Theme Songs—Johto Region",
    //             "description": "We're journeying through the Johto region today, Trainers! This arc of Pokémon the Series followed Ash and Pikachu as they ...",
    //             "thumbnails": {
    //                 "default": {
    //                     "url": "https://i.ytimg.com/vi/w7XdPcOz_4w/default.jpg",
    //                     "width": 120,
    //                     "height": 90
    //                 },
    //                 "medium": {
    //                     "url": "https://i.ytimg.com/vi/w7XdPcOz_4w/mqdefault.jpg",
    //                     "width": 320,
    //                     "height": 180
    //                 },
    //                 "high": {
    //                     "url": "https://i.ytimg.com/vi/w7XdPcOz_4w/hqdefault.jpg",
    //                     "width": 480,
    //                     "height": 360
    //                 }
    //             },
    //             "channelTitle": "The Official Pokémon YouTube channel",
    //             "liveBroadcastContent": "none",
    //             "publishTime": "2018-04-22T13:00:45Z"
    //         }
    //     }
    // ]

    //endregion

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px'
        },
    };

    function closeModal() {
        setConfirmationModalVisible(false);
    }

    return (
        <>
            <Box w={'100%'} minH={'100vh'} bgColor={'#e3e3e3'} justifyContent={'flex-start'} alignItems={'center'}
                 paddingY={'40px'}>
                <Center flexDir={'row'} mb={'32px'}>
                    <Input ref={ref} bgColor={'white'} fontSize={'16px'} borderRadius={'16px'} h={'40px'} type={'text'}
                           placeholder={'Search'} mr={'8px'} onKeyPress={({ nativeEvent }) => {
                        // Extract the key code from the event
                        const { key } = nativeEvent;

                        // Handle the specific key press
                        if (key === 'Enter') {
                            // Code to execute when the Enter key is pressed
                            // For example, submit the form or perform a search
                            search(ref.current?.value)
                        }
                    }}/>
                    <Button borderRadius={'8px'} onPress={() => {
                        search(ref.current?.value)
                    }
                    }>Search</Button>
                </Center>
                <Row flexWrap={'wrap'} w={'80%'} justifyContent={'center'}>
                    {
                        data.map(video => {
                            return (
                                <Column key={video.id.videoId}>
                                    <Box w={'336px'} h={'196px'} onClick={() => {
                                        setSelectedVideo({
                                            id: video.id.videoId,
                                            title: video.snippet.title,
                                            img: video.snippet.thumbnails.medium.url
                                        })
                                        setConfirmationModalVisible(true)
                                    }
                                    }>
                                        <div className={'thumbnail'}>
                                            <Image alt={'Photo not available'} borderRadius={'8px'}
                                                   src={video.snippet.thumbnails.medium.url} w={'320px'}
                                                   h={'180px'}/>
                                        </div>
                                    </Box>
                                    <Text w={'300px'} fontSize={'16px'} fontWeight={600} mb={'16px'}
                                          textAlign={'center'}>{video.snippet.title}</Text>
                                </Column>
                            )
                        })
                    }
                </Row>

            </Box>
            <Modal position={'absolute'} top={'-25%'} isOpen={confirmationModalVisible}
                   onClose={() => setConfirmationModalVisible(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton/>
                    <Modal.Header>Do you want to add this song to the playlist?</Modal.Header>
                    <Modal.Body paddingX={'20px'} justifyContent={'center'} alignItems={'center'}>
                        <Text fontSize={'16px'} mb={'16px'}>{selectedVideo.title}</Text>
                        <Image src={selectedVideo.img} w={'160px'} h={'90px'}/>
                    </Modal.Body>
                    <Modal.Footer justifyContent={'center'}>
                        <Button.Group space={2}>

                            <Button onPress={() => {
                                setConfirmationModalVisible(false);
                                handleAddVideo(selectedVideo.id)
                            }}>
                                Add
                            </Button>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setConfirmationModalVisible(false);
                            }}>
                                Cancel
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    );
};

export default SongChooser;
