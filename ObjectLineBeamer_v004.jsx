﻿var activeItem = app.project.activeItem;
var scriptName = "Beamer";
			if ((activeItem == null) || !(activeItem instanceof CompItem)) {
				alert("Please select or open a composition first ya doofus.", scriptName);
			} else {
				var selectedLayers = activeItem.selectedLayers;
				if (activeItem.selectedLayers.length == 0) {
					alert("Please select at least one layer in the active comp first ya dingus.", scriptName);
				}  
                  var LayLength = selectedLayers.length;
                    if (LayLength<=1){
                        alert("You need to have more than one Null selected.");
                    }else{
                var First = selectedLayers[0].index;
                var Second = selectedLayers[1].index;
                
                   if (First > Second){
                       alert("Select your layers from the top down.");
                       }else {
                    // create an undo group
                    app.beginUndoGroup("Beamer");
                    
                    // This is the start of the script
                    function randomInt(min,max)
                    {
                    return Math.floor(Math.random()*(max-(min+1))+(min+1));
                    }
                    
                    var randy = randomInt(1,999);
                    
                    var SHAPEsolid = activeItem.layers.addSolid([0,0,0], "SHAPES_Beamer"+randy, activeItem.width, activeItem.height, activeItem.pixelAspect);
                    
                    
                    var SEE = SHAPEsolid.Effects.addProperty("Circle");
                        SEE.property("Center").setValue([0,0]);
                        SEE.property("Radius").setValue(0);
                        SEE.name = 'dummy';
                        

                    var CONTsolid = activeItem.layers.addSolid([0,0,0], "MASTER_Beamer"+randy, activeItem.width, activeItem.height, activeItem.pixelAspect);
                    CONTsolid.opacity.setValue(0);
                    MasterSLD = CONTsolid.Effects.addProperty("Slider Control");
                    MasterSLD.property("Slider").setValue(100);
                    MasterSLD.name = 'Length';
                    TimeSLD = CONTsolid.Effects.addProperty("Slider Control");
                    TimeSLD.property("Slider").setValue(100);
                    TimeSLD.name = 'Time';
                    strtTHK = CONTsolid.Effects.addProperty("Slider Control");
                    strtTHK.property("Slider").setValue(2);
                    strtTHK.name = 'Starting Thickness';
                    endTHK = CONTsolid.Effects.addProperty("Slider Control");
                    endTHK.property("Slider").setValue(2);
                    endTHK.name = 'Ending Thickness';
                    SFT = CONTsolid.Effects.addProperty("Slider Control");
                    SFT.property("Slider").setValue(50);
                    SFT.name = 'Softness';
                    BCLR = CONTsolid.Effects.addProperty("Color Control");
                    BCLR.property("Color").setValue([255,255,255]);
                    BCLR.name = 'Beam Color';
                    /*
                    circRAD = CONTsolid.Effects.addProperty("Slider Control");
                    circRAD.property("Slider").setValue(0);
                    circRAD.name = 'Circle Radius';
                    CCLR = CONTsolid.Effects.addProperty("Color Control");
                    CCLR.property("Color").setValue([255,255,255]);
                    CCLR.name = 'Circle Color';
                    */
                                         
                    /* this was a renamer that i think we don't need
                    for (var i = 0; i < selectedLayers.length; i++) {	
                        SELname = selectedLayers[i].name;
                        NEWname = SELname+"_CNTRL"+i;
                        selectedLayers[i].name = NEWname;
                        // selectedLayers[i].scale.expression ="[100, 100]";
                            }*/
                        
                        
                    for (var i = 0; i < selectedLayers.length; i++) {
						
                        if (i<(selectedLayers.length-1)){
                        SELindex = selectedLayers[i].index;                        
                        SELname = selectedLayers[i].name;
                        SELendname = selectedLayers[(i+1)].name;
                        
                        //var BLKsolid = activeItem.layers.addSolid([0,0,0], SELname+"_Beamer"+i, activeItem.width, activeItem.height, activeItem.pixelAspect);
                       //BLKsolid.moveAfter(selectedLayers[i]);
                        var BeamSLD = SHAPEsolid.Effects.addProperty("Beam");
                        BeamSLD.property("Starting Point").expression = "a=thisComp.layer(\""+SELname+"\"); a.toComp(a.anchorPoint);"
                        BeamSLD.property("Ending Point").expression = "a=thisComp.layer(\""+SELendname+"\"); a.toComp(a.anchorPoint);"
                        
                   
                        BeamSLD.property("Length").expression = "thisComp.layer(\""+CONTsolid.name+"\").effect(\"Length\")(\"Slider\")";
                        BeamSLD.property("Time").expression = "SLDR = thisComp.layer(\""+CONTsolid.name+"\").effect(\"Time\")(\"Slider\"); NumLayers = "+selectedLayers.length+"; NumEffects = NumLayers-1; CurEffect = "+i+"; ActiveArea = 100/NumEffects; linear(SLDR,(CurEffect-1)*ActiveArea, CurEffect*ActiveArea, 0, 50);";

                        BeamSLD.property("Starting Thickness").expression = "if(effect(\""+BeamSLD.name+"\")(\"Time\")>0){val=thisComp.layer(\""+CONTsolid.name+"\").effect(\"Starting Thickness\")(\"Slider\");}else{val=0;} val";
                        BeamSLD.property("Ending Thickness").expression = "if(effect(\""+BeamSLD.name+"\")(\"Time\")>0){val=thisComp.layer(\""+CONTsolid.name+"\").effect(\"Starting Thickness\")(\"Slider\");}else{val=0;} val";
                        BeamSLD.property("Softness").expression = "thisComp.layer(\""+CONTsolid.name+"\").effect(\"Softness\")(\"Slider\")";
                        BeamSLD.property("Inside Color").expression = "thisComp.layer(\""+CONTsolid.name+"\").effect(\"Beam Color\")(\"Color\")";
                        BeamSLD.property("Outside Color").expression = "thisComp.layer(\""+CONTsolid.name+"\").effect(\"Beam Color\")(\"Color\")";
                        BeamSLD.property("Composite On Original").setValue(true);
                        /* adds a circle DONT NEED IT
                        var StarSLD = SHAPEsolid.Effects.addProperty("Circle");
                        StarSLD.property("Center").expression = "a=thisComp.layer(\""+SELname+"\"); a.toComp(a.anchorPoint);"
                        StarSLD.property("Radius").expression = "thisComp.layer(\""+CONTsolid.name+"\").effect(\"Circle Radius\")(\"Slider\")";
                        StarSLD.property("Color").expression = "thisComp.layer(\""+CONTsolid.name+"\").effect(\"Circle Color\")(\"Color\")";
                        StarSLD.property("Blending Mode").setValue(2);
                        */
                        }                      
                        
					}
                writeLn("FCK YA!");
                SHAPEsolid.locked = true;   

                    // close the undo group
                    app.endUndoGroup();
                    }
                }
                }
