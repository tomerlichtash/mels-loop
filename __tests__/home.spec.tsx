import React from 'react';
import ContentComponent from "../src/components/content/contentComponent";
import {IContentComponentInitData, MLParsedNodeType} from '../src/interfaces/models'
import {render, screen} from '@testing-library/react'
describe('hello world', () => {
  it('should render sample line', () => {
    const compData = {
      data: {
        type: 'paragraph',
        key: 'key',
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

    expect(wrapper.container.querySelector('span').textContent).toEqual(`sample line`);
  });
});