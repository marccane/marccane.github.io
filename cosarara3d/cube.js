"use strict";

var canvas;
var gl;

var NumVertices  = 36;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var thetaLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");

    //event listeners for buttons

    render();
}

function generateCube(x,y,z){

}

function quadrat(p1, p2, p3, color){

}

function colorCube()
{
    aberracio( 1, 0, 3, 2 );
    aberracio( 2, 3, 7, 6 );
    aberracio( 3, 0, 4, 7 );
    aberracio( 6, 5, 1, 2 );
    aberracio( 4, 5, 6, 7 );
    aberracio( 5, 4, 0, 1 );
}

function aberracio(a, b, c, d)
{
    var vertices = [
        vec4(  0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5,  0.5,  -0.5, 1.0 ),
        vec4(  0.5,  -0.5,  0.5, 1.0 ),
        vec4(  0.5,  -0.5,  -0.5, 1.0 ),
        vec4(  -0.5,  0.5,  0.5, 1.0 ),
        vec4(  -0.5,  0.5,  -0.5, 1.0 ),
        vec4(  -0.5,  -0.5,  0.5, 1.0 ),
        vec4(  -0.5,  -0.5,  -0.5, 1.0 )
    ];

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];

    // We need to parition the aberracio into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the aberracio indices

    //vertex color assigned by the index of the vertex

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        //colors.push( vertexColors[indices[i]] );

        // for solid colored faces use
        colors.push(vertexColors[a]);

    }
}

var angle = 0;
var factor = 5;

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //theta[axis] += 2.0;
    theta[0] += factor*/*Math.abs*/(Math.sin(angle));
    theta[1] += factor*Math.abs(Math.cos(angle+1.35));
    theta[2] += factor*/*Math.abs*/(Math.sin(angle+0.38));
    angle+=0.1;

    gl.uniform3fv(thetaLoc, theta);

    gl.drawArrays( gl.TRIANGLES, 0, 36 );

    requestAnimFrame( render );
}
