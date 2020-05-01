import React from 'react';
import {
  TextField, Button, Select, MenuItem, InputLabel,
  FormControl, Divider, Tooltip
} from "@material-ui/core"
import { useStyles } from "./index_style"
import { gapi } from 'gapi-script'
import logo from "./ressources/icone_yt.png"
import { Parameter, Order, Type, VideoDefinition, VideoDuration, VideoType, Items } from "./types"


const YoutubeViewer: React.FunctionComponent = () => {

  const classes = useStyles()

  const client_id = "YOUR_CLIENT_ID"
  const APIKey = "API_KEY"

  const [videoDefinition, setVideoDefinition] = React.useState<VideoDefinition>("any")
  const handleChangeVideoDefinition = (event: React.ChangeEvent<{ value: string | unknown }>) => {
    setVideoDefinition(event.target.value as VideoDefinition)
  };
  const [videoDuration, setVideoDuration] = React.useState<VideoDuration>("any")
  const handleChangeVideoDuration = (event: React.ChangeEvent<{ value: string | unknown }>) => {
    setVideoDuration(event.target.value as VideoDuration)
  };
  const [videoType, setVideoType] = React.useState<VideoType>("any")
  const handleChangeVideoType = (event: React.ChangeEvent<{ value: string | unknown }>) => {
    setVideoType(event.target.value as VideoType)
  };
  const [order, setOrder] = React.useState<Order>("viewCount")
  const handleChangeOrder = (event: React.ChangeEvent<{ value: string | unknown }>) => {
    setOrder(event.target.value as Order)
  };
  const [type, setType] = React.useState<Type>("video")
  const handleChangeType = (event: React.ChangeEvent<{ value: string | unknown }>) => {
    setType(event.target.value as Type)
  };
  const [query, setQuery] = React.useState("akram")
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }
  const [publishedBefore, setPublishedBefore] = React.useState("2020-04-22")
  const handleChangePublishedBefore = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublishedBefore(event.target.value)
  }
  const [publishedAfter, setPublishedAfter] = React.useState("2018-07-22")
  const handleChangePublishedAfter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublishedAfter(event.target.value)
  }
  const [maxResults, setMaxResults] = React.useState(30)
  const handleChangeMaxResults = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxResults(parseInt(event.target.value))
  }

  const [items, setItems] = React.useState<Array<Items>>([])


  const parameters: Parameter = {
    "part": "snippet",
    "q": query,
    "order": order,
    "type": type,
    "videoDefinition": videoDefinition,
    "videoDuration": videoDuration,
    "videoType": videoType,
    "maxResults": maxResults,
    "regionCode": "FR",
    "safeSearch": "none",
    "eventType": "completed",
    // "channelType": "any"
    // "publishedBefore": publishedBefore,
    // "publishedAfter": publishedAfter
  }

  const orders: Order[] = ["date", "rating", "viewCount", "relevance", "title", "videoCount"]
  const types: Type[] = ["video", "playlist", "channel"]
  const videoDefinitions: VideoDefinition[] = ["any", "high", "standard"]
  const videoDurations: VideoDuration[] = ["any", "long", "medium", "short"]
  const videoTypes: VideoType[] = ["any", "episode", "movie"]


  const buildQueryParam = (parameters: Parameter) => {
    const keys = Object.keys(parameters)
    const params = keys.reduce((acc, key) => {
      return `${acc}&${key}=${parameters[key as keyof Parameter]}`
    }, "")
    return `?key=${APIKey}${params}`
  }

  const url = "https://content.googleapis.com/youtube/v3/search"
  const queryParam = buildQueryParam(parameters)

  React.useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ client_id });
    });
  }, [])


  const authenticate = () => {
    console.log(gapi)
    return gapi.auth2.getAuthInstance()
      .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
      .then(() => {
        console.log("Sign-in successful")
      },
        (err: string) => {
          console.error("Error signing in", err)
        });
  }

  const loadClient = () => {
    gapi.client.setApiKey(APIKey);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(() => {
        console.log("GAPI client loaded for API")
      },
        (err: string) => {
          console.error("Error loading GAPI client for API", err)
        });
  }

  const execute = () => {
    fetch(encodeURI(url + queryParam), { method: "GET" }).then(response => {
      console.log("Response", response)
      return response.json()
    })
      .then(data => {
        return setItems(data.items)
      })
      .catch(err => {
        console.error("Error fetching query", err)
      })

    // fetch("https://www.googleapis.com/youtube/v3/videos").then(res => {
    //   console.log(res)
    // })
    // return gapi.client.youtube.search.list(parameters)
    //   .then((response: any) => {
    //     // Handle the results here (response.result has the parsed body).
    //     console.log("Response", response);
    //       return response.result
    //   },
    //     (err: string) => {
    //       console.error("Execute error", err)
    //     })
    //     .then((data: any) => {
    //       return setItems(data.items)
    //     });
  }

  const authorizeAndLoad = () => {
    authenticate().then(loadClient)
  }

  return (
    <div className={classes.root}>
      <div className={classes.mainTitle}>
        <img src={logo} alt="youtube" height={30} />
        <h1 className={classes.h1}>Recherche Youtube</h1>
      </div>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField label="part" disabled value={"snippet"} className={classes.textField} InputLabelProps={{ classes: { root: classes.labelTextfield } }} />
        <FormControl>
          <InputLabel>order</InputLabel>
          <Select value={order} onChange={handleChangeOrder} className={classes.select}>
            {orders.map((order, index) => <MenuItem key={index} value={order}>{order}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField required label="query" placeholder="string" value={query} onChange={handleChangeQuery} className={classes.textField} InputLabelProps={{ classes: { root: classes.labelTextfield } }} />
        <TextField label="maxResults" value={maxResults} type="number" onChange={handleChangeMaxResults} className={classes.textField} InputLabelProps={{ classes: { root: classes.labelTextfield } }} />
        <TextField label="publishedBefore" type="date" placeholder="1970-01-01T00:00:00Z" value={publishedBefore} onChange={handleChangePublishedBefore}
          className={classes.textField}
          InputLabelProps={{ shrink: true, classes: { root: classes.labelTextfield } }} />
        <TextField label="publishedAfter" type="date" placeholder="1970-01-01T00:00:00Z" value={publishedAfter} onChange={handleChangePublishedAfter}
          className={classes.textField}
          InputLabelProps={{ shrink: true, classes: { root: classes.labelTextfield } }} />
        <FormControl>
          <InputLabel>type</InputLabel>
          <Select value={type} onChange={handleChangeType} className={classes.select}>
            {types.map((type, index) => <MenuItem key={index} value={type}>{type}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>videoDefinition</InputLabel>
          <Select value={videoDefinition} onChange={handleChangeVideoDefinition} className={classes.select}>
            {videoDefinitions.map((videoDefinition, index) => <MenuItem key={index} value={videoDefinition}>{videoDefinition}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>videoType</InputLabel>
          <Select value={videoType} onChange={handleChangeVideoType} className={classes.select}>
            {videoTypes.map((videoType, index) => <MenuItem key={index} value={videoType}>{videoType}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>videoDuration</InputLabel>
          <Select value={videoDuration} onChange={handleChangeVideoDuration} className={classes.select}>
            {videoDurations.map((videoDuration, index) => <MenuItem key={index} value={videoDuration}>{videoDuration}</MenuItem>)}
          </Select>
        </FormControl>
      </form>
      <div className={classes.buttons}>
        <Button color="secondary" variant="contained" onClick={authorizeAndLoad}>authorize and load</Button>
        <Button disabled={query.length < 2} color="primary" variant="contained" onClick={execute}>execute</Button>
      </div>
      <div className={classes.itemsContainer}>
        {items && items.map((e, index) => {
          const { channelId, channelTitle, description, publishedAt, thumbnails, title } = e.snippet
          const url = "https://www.youtube.com/watch?v=" + e.id.videoId
          const channelUrl = "https://www.youtube.com/channel/" + channelId
          return (
            <div className={classes.item} key={index}>
              <div className={classes.content}>
                <a href={url}><img src={thumbnails.default.url} alt="img" className={classes.img} /></a>
                <div>
                  <a href={url} className={classes.title}><h3>{title}</h3></a>
                  <Tooltip title={`Go to channel ${channelTitle}`}>
                    <a href={channelUrl} className={classes.title}>
                      {channelTitle}
                    </a>
                  </Tooltip>
                  {publishedAt}
                  <div className={classes.description}>{description}</div>
                </div>
              </div>
              <Divider className={classes.divider} />
            </div>
          )
        })}
      </div>
    </div >
  );
}

export default YoutubeViewer;
