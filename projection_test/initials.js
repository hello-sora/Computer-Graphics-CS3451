/******************************************************************************
Draw your initials here in perspective.

It must be obvious from your drawing that the initials are in perspective.
You can achieve this in two ways.  One way is to create a 3D set of initials,
and make sure that multiple depths of the parts are shown. The other way is
to have your initials in single plane, but slant the plane in which your
initials are in so that we can see perspective foreshortening.

It is not sufficient to use diagonal instead of straight lines to give the
illusion of perspective.  
******************************************************************************/

function persp_initials() {
  Init_Matrix();
  Perspective(70, 20, 40);
  Translate(-2, 0, -20);
  RotateX(-60);
  //S
  BeginShape();
  Vertex(-5, -6, 0);
  Vertex(5, -3, 0);
  Vertex(5, -3, 0);
  Vertex(-5, 3, 0);
  Vertex(-5, 3, 0);
  Vertex(5, 6, 0);
  EndShape();
  //B
  BeginShape();
  Vertex(11, 4, 0);
  Vertex(7, 8, 0);
  Vertex(11, 4, 0);
  Vertex(7, 0, 0);
  Vertex(7, 0, 0);
  Vertex(11, -4, 0);
  Vertex(11, -4, 0);
  Vertex(7, -8, 0);
  Vertex(7, -8, 0);
  Vertex(7, 0, 0);
  Vertex(7, 0, 0);
  Vertex(7, 8, 0);
  //Vertex(3, 5, 0);
  //Vertex(8, 5, 0);
  //Vertex(8, 5, 0);
  //Vertex(8, 3, 0);
  //Vertex(8, 3, 0);
  //Vertex(3, 3, 0);
  //Vertex(3, 3, 0);
  //Vertex(3, 5, 0);
  //Vertex(3, 3, 0);
  //Vertex(3, 0, 0);
  //Vertex(3, 0, 0);
  //Vertex(8, 0, 0);
  //Vertex(8, 0, 0);
  //Vertex(8, 3, 0);
  EndShape();
}
