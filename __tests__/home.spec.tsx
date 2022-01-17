import { shallow } from "enzyme";
import React from "react";
import {MLParsedNodeType} from '../src/interfaces/models'
// import Home from "../src/pages/index";
import ContentComponent from "../src/components/content/contentComponent";
// import Layout from "../src/pages/layout";

const compData = {data:{type: 'paragraph' as MLParsedNodeType, key: 'key', line: 1}, locale: 'en-US'};

describe("With Enzyme", () => {
  it('some spec here', () => {
    const comp = shallow(<ContentComponent data={compData}/>);
    // const app = shallow(<Home locale={'en-US'} content={'some string'} />);
    // expect(app.find("p").text()).toEqual("A simple example repo");
  });
});