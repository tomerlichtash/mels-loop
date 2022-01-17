import React from 'react';
import ContentComponent from "../src/components/content/contentComponent";
import {IContentComponentInitData, MLParsedNodeType} from '../src/interfaces/models'
import {render, screen} from '@testing-library/react'
describe('hello world', () => {
  const compData = {
    data: {
      type: 'paragraph',
      key: 'key',
      line: 1,
      children: [
        {
          type: 'text',
          key: 'line-1',
          line: 1,
          text: 'sample line'
        }
      ]
    },
    locale: 'en-US'
  } as IContentComponentInitData;
  const wrapper = render(<ContentComponent data={compData}/>);
  expect(wrapper.container.getElementsByTagName('span')[0]).toEqual(`sample line`);
});