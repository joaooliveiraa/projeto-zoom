class SocketBuilder {
  constructor({ socketUrl }) {
    this.socketUrl = socketUrl;
    this.onUserConnected = () => {};
    this.onUserDisconnected = () => {};
  }

  setOnUserConnected(fn) {
    this.onUserConnected = fn;
    return this;
  }

  setOnUserDisconnected(fn) {
    this.onUserDisconnected = fn;
    return this;
  }

  build() {
    const socket = io.connect(this.socketUrl, {
      withCredentials: false,
    });

    socket.on("user-connect", this.onUserConnected);
    socket.on("user-disconected", this.onUserDisconnected);

    return socket


  }
}
