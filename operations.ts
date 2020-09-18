
import AgoraRTC from 'agora-rtc-sdk'

class operations {
    _name: string;
    _age: number;


    constructor() {

    }
     client; // Agora client
     localTracks = {
        videoTrack: null,
        audioTrack: null
    };
     remoteUsers = {};
// Agora client options
     options = {
        appid: null,
        channel: null,
        uid: null,
        token: null
    };

// the demo can auto join channel with params in url





async  join() {
    // create Agora client
    this.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

    // add event listener to play remote tracks when remote user publishs.
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);

    // join a channel and create local tracks, we can use Promise.all to run them concurrently
    [ options.uid, localTracks.audioTrack, localTracks.videoTrack ] = await Promise.all([
        // join the channel
        client.join(options.appid, options.channel, options.token || null),
        // create local tracks, using microphone and camera
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack(),




    ]);

    // play local video track
    localTracks.videoTrack.play("local-player");
    text(`localVideo(${options.uid})`);

    // publish local tracks to channel
    await client.publish(Object.values(localTracks));
    console.log("publish success");
}

async  leave() {
    let trackName;
    for (trackName in localTracks) {
        var track = localTracks[trackName];
        if(track) {
            track.stop();
            track.close();
            localTracks[trackName] = undefined;
        }
    }

    // remove remote users and player views
    this.remoteUsers = {};


    // leave the channel
    await client.leave();

    text("");
    attr("disabled", false);
    attr("disabled", true);
    console.log("client leaves channel success");
}

async  subscribe(user, mediaType) {
    const uid = user.uid;
    // subscribe to a remote user
    await client.subscribe(user, mediaType);
    console.log("subscribe success");
    if (mediaType === 'video') {


        user.videoTrack.play(`player-${uid}`);
    }
    if (mediaType === 'audio') {
        user.audioTrack.play();
    }
}

 handleUserPublished(user, mediaType) {
    const id = user.uid;
    remoteUsers[id] = user;
    subscribe(user, mediaType);
}

 handleUserUnpublished(user) {
    const id = user.uid;
    delete remoteUsers[id];
    remove();
}


}





