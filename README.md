## Synopsis

A fun, musical, odd, something project, quite simply a musical version of the Find feature in your favourite browser.
Inspired by the projects developed with Tone.js, Musical Text explores the popular WebAudio synthesis/sequencing library in combination with Waypoints to achieve an interactive audio installation in the browser.

A master chain is set up which loads various synthesiser modules and effects that are routed through audio nodes, these are then customised via presets which the user determines. 

The site allows editing of the entire placement text to whatever the user wishes, meaning he/she can paste in their favourite verses of Shakespeare or Homer or Gary Barlow’s autobiography or whatever they like, then search for any words they chose amongst the text. 

The integration of Waypoints results in events triggered at 50% viewport height, so as a word with the class ‘tone-trigger’ appears at the central height of the screen a function is called which then triggers a sound. At the same time, a class of ‘np-current’ is added to that particular element resulting in a change of its colour to indicate to the user where in the text it appears. 

Various UI buttons have been set which are fixed to the right of the screen, and then transition out on click. 

On screen load, a welcome dialog appears to help the user, after they close this dialog box a key/value pair is stored in localStorage to ensure it won’t appear again when they load the page, but they can click on the information symbol on the right to see the dialog box appear again.

The notes played via the synthesiserzer are simply randomised notes in the key of C. There is an additional function that creates chord notes when preset 4 is enabled, as this preset utilises a polyphonic synth. 

Audio effects explored are delay, phaser, chorus and vibrato, and the master chain has been set up to compress and limit the final outputted audio signal to prevent the users speakers from disintegrating.


## Motivation

To explore the power of Tone.js and Waypoints.

## Goal

Explore other sonic possibilities, perhaps different key signatures or sequencing methods, as well as raw audio data.

## Installation

Download zip


## Contributors

Feel free to submit feedback, pull and & customise! 


