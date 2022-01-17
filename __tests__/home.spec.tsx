// // import { render, screen } from '@testing-library/react'
// import { shallow } from "enzyme";
// import React from "react";
// import {MLParsedNodeType} from '../src/interfaces/models'
// // import Home from "../src/pages/index";
// // import Layout from "../src/pages/layout";


// describe("With Enzyme", () => {
//   it('some spec here', () => {
//     const comp = shallow(<ContentComponent data={compData}/>);
//     // const app = shallow(<Home locale={'en-US'} content={'some string'} />);
//     // expect(app.find("p").text()).toEqual("A simple example repo");
//   });
// });

// // describe('Home', () => {
// //   it('renders a heading', () => {
// //     // render(<Home data={compData}/>)

// //     // const heading = screen.getByRole('heading', {
// //     //   name: /welcome to next\.js!/i,
// //     // })

// //     expect(false).toBeFalsy()
// //     // expect(heading).toBeInTheDocument()
// //   })
// // })
import React from 'react';
import ContentComponent from "../src/components/content/contentComponent";
import {render, screen} from '@testing-library/react'
describe('hello world', () => {
  const compData = {data:{type: 'paragraph', key: 'key', line: 1}, locale: 'en-US'};
  const wrapper = render(<ContentComponent data={compData}/>);
//  const wrapper = render(<p id="testId">Hello Jest!</p>);
 expect(wrapper.container.innerHTML).toEqual('Hello Jest!');
});