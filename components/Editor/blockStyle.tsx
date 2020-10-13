import { ContentBlock } from "draft-js";


export const blockStyle = (block: ContentBlock) => {
    const type = block.getType();

    if (type === "header-one") {
        return 'fancyHeaderOne';
    }
    if( type === 'header-two') {
      return 'fancyHeaderTwo'
    }
    if( type === 'header-three') {
      return 'fancyHeaderThree'
    }
    if( type === 'header-four') {
      return 'fancyHeaderFour'
    }
    if( type === 'header-five') {
      return 'fancyHeaderFive'
    }
    if( type === 'header-six') {
      return 'fancyHeaderSix'
    }
    if (type === 'code'){
      return 'fancyCodeBlock'
    }

    if(type ==='blockquote'){
      return 'superFancyBlockquote'
    }

    if(type === 'atomic'){
      return 'fancyAtomic'
    }
};
