let express = require( 'express' );
let app = express();
let server = require( 'http' ).Server( app );
const cors = require("cors");

app.use(cors({

    origin: '*',
    
    }))

let io = require( 'socket.io' )(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );


app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );


io.of( '/stream' ).on( 'connection', stream );

server.listen( 3000 );