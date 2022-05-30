# Character Diversion

**The Platform for Typographic Discourse**

##Introduction

Start with how important discourse is for a democracy and how important it is to facilitate this discourse. 

In my research into the history of Hebrew and Latin typography, I noticed that although both writing systems can be traced back to the Phoenecian script, today they follow very different typographic paradigms. This differenciation began before typography itself was born as a consequence of the invention of the printing press in 1450 (source).

Steps of differenciation:

1. When Latin dicided to be written from RTL only
2. Different tools: Chizelling → Serifs
3. Jews persecuted and lving in the diaspora
   1. less technological development (in terms of printing)
   2. and living in the diaspora may have led them to cling to traditions more (this is a steep hypothesis that desperately needs a source!)

With this process of differenciation, not only did the two scripts set themselves apart from one another – they developed conventions.



###Why → Question Conventions
####What are conventions (for)?


1. questioning typographic convention
2. lack of forums that facilitates type specific discourse
   1. (come up with positive "why")

### How → Enable Discourse

#### Discourse

keywords:

- control of discourse amounts to control of how the world is perceived
  - social theory often studies discourse as a window into power
- Michel Foucault
- discourse
  - generating knowledge
  - 'will to truth' (Foucault, 1971, p.10f) is the major system of exclusion that forges discourse and which 'tends to exert a sort of pressure and something like a power of constraint on other discourses', (1970, cited in Shapiro 1984, p. 113-4).
    - Foucault, The Order of Discours (1971, p.11)



1. Enabling people to have this discourse by having an 
   1. overview
   2. interactivity
   3. 

## Process (The What)

1. Platform

### Concept

In an attempt to buld a platfrom that facilitates typographic discourse, I put my attention to what this discourse needs and what existing platforms are missing. For this I distinguish between three kinds of discourse: the one that orbits around a specific type design project, another one that asks fundamental questions of where we want to take typography going forward and the last one that lives without a platform in the streets, backyards and lunch rooms.

The former is predominantly led by independent type designers and enthusiasts (source?). The second has been pushed by renowned designers in the form 

### User Interface

Character Diversion is a platform for typographic discourse. Accordingly, typography and discourse should lie at the heart of the application. User experience and interfaces need to communicate clearly what the app does and how to use it.

#### Discourse

The benefit of recorded and structured discourse is that people can learn from it without engaging in it. The discourse lives, on the other hand, from participation. The user experience in respect to the discourse needs to properly summarize and display the status quo of the discourse as well as shouw an easy entry point for engagement.

### Architecture & Deployment

#### Information Structure

1. Home
2. Discover Discourses
   1. New Discourse
   2. Discourse
      1. Title
      2. Description
      3. Author
      4. Font(s)
      5. Opinion
         1. Content
         2. Author
         3. Font(s)
         4. Glyphs
            1. Marked Areas
         5. Tuple Spectrum
         6. Comments
            1. Content
            2. Author
3. Profile

#### Structuring Opinions

A major question to overcome was the structure of opinions and how to design the interface.

#### JavaScript Framework

##### Component Based Approach

For the longest time, it was common practice in web development to separate markup (HTML), styling (CSS) and functionality (JavaScript) (source). All styles would be written in a large CSS file and the same would be done with JavaScript. 

In recent years there has been a paradigm shift, however, towards a component based approach. In this approach, a website or an app would be divided into smaller elements and then the markup, styles and functionality for each element would be stored in a sperate file. Like many JavaScript frameworks, Vue.js uses a component based approach to front end development. 

A component is usually a generic shell which accepts data that will populate this shell.

```vue
<template>
	<button :style="`background-color: ${color}">
    {{label}}											  // ^^^^^
   // ^^^^^
  </button>
</template>
<script>
  export default {
    props: ['label', 'color'],
  }
</script>
```

One particularly appealing concept is the atomic design system. It is constructed from atoms, which form molecules, which in turn form organisms which live in templates and pages. In a UI context a button and a text input field can be understood as atoms and when put together to a search field they become a molecule. This molecule of a search field can be embeded into the organism of a header, side-by-side with a logo atom and a main-menu molecule. This organism of a header can live in a template or a page.

#### Node.js CMS

1. HTML/CSS
2. JavaScript
3. TypeScript
4. Vue.js
5. Nuxt.js
6. Strapi
7. Heroku

## Case Study

###Non-Conventional Hebrew-Latin Character Relationships

reference back to proposals

## Outlook

#### Potential Features

##### Image detection

The current design of the platform requires users to upload font files in order to refer to certain characters. The reality in typographic discourse is, however, that some questions orbit around typefaces that have not font files or the licensing disallows the upload of font files. Currenty those discourse are held by uploading imagery and even drawings of letterforms.

A potential future feature of Character Diversion could be the option to upload an image instead of a font and have to app automatically detect the letters, assign them to their Unicode symbol and allow users to associate opinions with those letters. This way a core functionality of Character Diversion would be extended to wide range of use cases.
