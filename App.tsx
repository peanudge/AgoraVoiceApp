import React, { Component, useState, useEffect, useRef } from 'react'
import { Platform, Button, TextInput, View, Text } from 'react-native'
// Import the RtcEngine class into your project.
import RtcEngine from 'react-native-agora'
// Import the UI styles.
import styles from './components/Style'

const APP_ID = "faafbd0218c94adab88d4bd0d988e179";
const CHANNEL = "TEST";
const TOKEN = "006faafbd0218c94adab88d4bd0d988e179IAAiAkTIp0+PI4voB9bDnq3cs99O17ZhRmmFf/iPXeTJgriT6u4AAAAAEABr21wC6Q+OYQEAAQDpD45h";


// Define a State interface.
interface AgoraInfo {
  appId: string,
  token: string,
  channelName: string,
  openMicrophone: boolean,
  enableSpeakerphone: boolean,
  peerIds: number[],
}

export default function App() {
  const [agoraInfo, setAgoraInfo] = useState<AgoraInfo>({
    appId: APP_ID,
    token: TOKEN,
    channelName: CHANNEL,
    openMicrophone: true,
    enableSpeakerphone: true,
    peerIds: [],
  });

  const [isJoinSucceed, setIsJoinSucced] = useState<boolean>(false);

  const rtcEngine = useRef<RtcEngine | null>(null);

  const init = async () => {
    rtcEngine.current = await RtcEngine.create(agoraInfo.appId);
    const engine = rtcEngine.current;
    await engine.enableAudio();
    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed)
      const { peerIds } = agoraInfo;
      if (peerIds.indexOf(uid) === -1) {
        setAgoraInfo({
          ...agoraInfo,
          peerIds: [...peerIds, uid]
        })
      }
    })
    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline/', "uid: ", uid, ",reason:", reason);
      const { peerIds } = agoraInfo;
      setAgoraInfo({
        ...agoraInfo,
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid)
      })
    })
    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed)
      setIsJoinSucced(true);
    })
  }

  // Pass in your token and channel name through this.state.token and this.state.channelName.
  // Set the ID of the local user, which is an integer and should be unique. If you set uid as 0,
  // the SDK assigns a user ID for the local user and returns it in the JoinChannelSuccess callback.
  const joinChannel = async () => {
    console.log("Join Channel");
    await rtcEngine.current?.joinChannel(
      agoraInfo.token,
      agoraInfo.channelName,
      null,
      0);
  }

  const leaveChannel = async () => {
    console.log("Leave Channel");
    await rtcEngine.current?.leaveChannel()
    setAgoraInfo({ ...agoraInfo, peerIds: [] })
    setIsJoinSucced(false);
  }

  // Turn the microphone on or off.
  const switchMicrophone = () => {
    const { openMicrophone } = agoraInfo;
    rtcEngine.current?.enableLocalAudio(!openMicrophone).then(() => {
      setAgoraInfo({ ...agoraInfo, openMicrophone: !openMicrophone })
    }).catch((err) => {
      console.warn('enableLocalAudio', err)
    })
  }

  // Switch the audio playback device.
  const switchSpeakerphone = () => {
    const { enableSpeakerphone } = agoraInfo;
    rtcEngine.current?.setEnableSpeakerphone(!enableSpeakerphone).then(() => {
      setAgoraInfo({ ...agoraInfo, enableSpeakerphone: !enableSpeakerphone })
    }).catch((err) => {
      console.warn('setEnableSpeakerphone', err)
    })
  }


  useEffect(() => {
    init().catch(err => console.log(err));
  }, [])

  const {
    appId,
    channelName,
    openMicrophone,
    enableSpeakerphone,
  } = agoraInfo;

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>AppId: {appId}</Text>
        <Text>ChannelName: {channelName}</Text>
        <Text>OpenMicrophone: {openMicrophone ? "On" : "Off"} </Text>
        <Text>EnableSpeakerphone: {enableSpeakerphone ? "On" : "Off"}</Text>
        <Text></Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAgoraInfo({ ...agoraInfo, channelName: text })}
          placeholder={'Channel Name'}
          value={channelName}
        />
        <Button
          onPress={() => isJoinSucceed ? leaveChannel() : joinChannel()}
          title={`${isJoinSucceed ? 'Leave' : 'Join'} channel`}
        />
      </View>
      <View style={styles.float}>
        <Button
          onPress={switchMicrophone}
          title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
        />
        <Button
          onPress={switchSpeakerphone}
          title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
        />
      </View>
    </View>
  )
}
