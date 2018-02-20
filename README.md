React Depth of Field
=========

A React component which applies a depth of field effect to its children.

## Demo

<a href="http://react-depth-of-field.surge.sh/" target="_blank">__Live demo__</a>

## Table of Contents

* [Installation](#installation)
* [Features](#features)
* [Quickstart](#quickstart)
* [API Reference](#apireference)
* [Compatibility](#compatibility)
* [License](#license)

## Installation

```bash
npm install react-depth-of-field --save
```

## Features

* Focus pulling - changing focus from one child index to another will indux a focus pull whereby the 'focal point' shifts across intermediate children, if any
* Focus pull transition time - the time it takes to transition from one focus state to another
* Adjustable depth of field - the intensity of the depth of field can be adjusted

## Quickstart

To use React Depth of Field, simply wrap the desired elements in a 'DepthOfField' component and apply any custom options you see fit.

```jsx
import DepthOfField from 'react-depth-of-field';

const ImageGallery = ({ images }) => (
  <DepthOfField
    focus={0} // index of child to be in focus
    blurIncrement={2} // sets strength of DOF
    animationTime={200} // transition time between children
    >
    {images.map(image => {
      <Image key={image.id} {...image} />
    })}
  </DepthOfField>
);
```

#### Another Example

In the code sample, clicking an image element changes the child index used by the focus prop of the DepthOfField component to the index of the clicked child element. This would induce a focus pull whereby the 'focal point' moves across intermediate children (if any) to the new child index.

```jsx
import DepthOfField from 'react-depth-of-field';

class ShowCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetIndex: 0
    };
  }

  changeTargetIndex = val => {
    this.setState({
      targetIndex: val
    });
  };

  render() {
    const { targetIndex } = this.state;
    const { images } = this.props;
    return (
      <DepthOfField
        focus={targetIndex}
        blurIncrement={2}
        animationTime={500}
      >
        {images.map(image => {
          <Image onClick={() => this.changeTargetIndex(i)} key={image.id} {...image} />
        })}
      </DepthOfField>
    );
  }
}

```

## API Reference

React Depth of Field is a React component, and is configured via the following props:

### `focus`

| **Accepted Types:** | **0** |
|---------------------|-------------------|
|  `Number` | `undefined` |

The index of the child element to be in focus. By default, the first child, or '0' is in focus. A blur filter of increasing increments is applied to adjacent elements above and/or below the targeted child.

### `blurIncrement`

| **Accepted Types:** | **0** |
|---------------------|-------------------|
|  `Number` | `undefined` |

The amount by which the blur strength increments between one child and the next moving out from a given target. For example, if you have five children and target child three, adjacent children will blur by an incremement of 2px as follows:

* Child 0 = __4px__
* Child 1 = __2px__
* Child 2 = __0px__ [target]
* Child 3 = __2px__
* Child 4 = __4px__

### `animationTime`

| **Accepted Types:** | **0** |
|---------------------|-------------------|
|  `Number` | `undefined` |

The length, in milliseconds, of a focus transition from one child to the next.

## Compatibility

To Do

## Licence

MIT