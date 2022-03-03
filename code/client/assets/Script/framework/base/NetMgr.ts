export class NetMgr {
    private static gateConn : pomelo;
    
    static GetGateServer(getGateCallback:Function) {
        if(this.gateConn) {
            this.gateConn = null;
        }
        this.gateConn = new pomelo();
        var host = window.location.hostname;
        var port = 3014;

        let gateConn = this.gateConn;
        gateConn.init({
            host: host,
            port: port,
            log: true
        }, getGateCallback);
    }

    static conn : pomelo;
    //连接服务器
    //成功 执行回调
    //失败 报错
    static Connect(host, port, callback:Function) {
        if (this.conn) {
            this.conn = null;
        }
        this.conn = new pomelo()
        this.conn.init({
            host: host,
            port: port,
            log: true
            }, callback);
    }

    //登入网关
    static Login(uid, callback) {
        var host = window.location.hostname;
        var port = 3014;
        var route = 'gate.gateHandler.queryEntry';
        NetMgr.Connect(host, port, function() {
            this.conn.request(route, {
                uid: uid
            }, function(data) {
                this.conn.disconnect(null);
                if(data.code === 500) {
                    // showError(LOGIN_ERROR);
                    return;
                }
                callback(data.host, data.port);
            });
        })
    }

    //登入聊天室
    static Enter(username) {
        var route = "connector.entryHandler.enter";

        //先登入网关
        NetMgr.Login(username, function(host, port) {{
            //分配到聊天服务器

            //登入聊天服务器
            NetMgr.Connect(host, port, function() {
                this.conn.request(route, {
                    uid: username,
                    rid: 2333,
                }, function(data) {
                    
                    if(data.code === 500) {
                        // showError(LOGIN_ERROR);
                        return;
                    }
                });
            })
        }})
    }
}