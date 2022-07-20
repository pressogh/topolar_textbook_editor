import React, {useRef, useState} from 'react';
import '@/assets/sass/Curriculum/TextbookBrowser.scss'
import reactHtmlParser from 'react-html-parser';

import {loadImage} from '@/helpers/electronFileSystem'

import Button from '@/components/Button';

import DescEditor from '@/components/textbooks/editors/DescEditor';
import CodeEditor from '@/components/textbooks/editors/CodeEditor';
import LinkEditor from "@/components/textbooks/editors/LinkEditor";

import DescContent from '@/components/textbooks/contents/DescContent';
import CodeContent from '@/components/textbooks/contents/CodeContent';
import ImageContent from '@/components/textbooks/contents/ImageContent';
import LinkContent from '@/components/textbooks/contents/LinkContent';

import ButtonGroup from "@/components/textbooks/ButtonGroup";

const TextbookContentView = ({
         data,
         JSONLoading,
         addDesc,
         changeDesc,
         addCode,
         changeCode,
         addLink,
         deleteJSONBookItem
     }) => {

    const text = useRef("");
    const code = useRef("");
    const codeLanguage = useRef("");
    const link = useRef({textbook_id: "", indicator: ""});

    const [selectedImage, setSelectedImage] = useState(null);
    const [hoverItemIndex, setHoverItemIndex] = useState(null);

    if (JSONLoading){
        return null;
    }
    if (!data){
        return null;
    }

    return (
        <div className="textbook-content-view">
            <div>
                <div className={"textbook-container"}>
                    <div className={"textbook-header"}>
                        <div className={"textbook-title"}>
                            {data.title}
                        </div>
                    </div>


                    <div className="textbook-body">
                        <ButtonGroup
                            index={-1}
                            text={text}
                            codeLanguage={codeLanguage}
                            code={code}
                            link={link}
                            addDesc={addDesc}
                            addCode={addCode}
                            addLink={addLink}
                            deleteJSONBookItem={deleteJSONBookItem}
                        />
                        {reactHtmlParser(data.description_title)}
                        {
                            data.components?.map((components_item, index) => {
                                let type = components_item.type;

                                return (
                                    <div onMouseEnter={() => setHoverItemIndex(index)} onMouseLeave={() => setHoverItemIndex(null)} className={'body-desc'}>
                                        {
                                            type === "desc" ?
                                                <DescContent
                                                    key={index}
                                                    index={index}
                                                    components_item={components_item}
                                                    changeDesc={changeDesc}
                                                /> :
                                            type === "code" ?
                                                <CodeContent
                                                    key={index}
                                                    index={index}
                                                    components_item={components_item}
                                                /> :
                                            type === "image" ?
                                                <ImageContent
                                                    key={index}
                                                    components_item={components_item}
                                                    loadImage={loadImage}
                                                    selectedImage={selectedImage}
                                                    setSelectedImage={setSelectedImage}
                                                /> :
                                            type === "link" ?
                                                <LinkContent
                                                    key={components_item.link}
                                                    components_item={components_item}
                                                /> : null
                                        }
                                        {
                                            hoverItemIndex === index &&
                                                <ButtonGroup
                                                    index={index}
                                                    text={text}
                                                    codeLanguage={codeLanguage}
                                                    code={code}
                                                    link={link}
                                                    addDesc={addDesc}
                                                    addCode={addCode}
                                                    addLink={addLink}
                                                    deleteJSONBookItem={deleteJSONBookItem}
                                                />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div style={{marginTop: "50px"}}>
                <div style={{marginTop: "20px", marginBottom: "20px"}}>
                    <DescEditor placeholder={"이곳에 desc 입력"} text={text} />
                </div>

                <div>
                    <CodeEditor codeLanguage={codeLanguage} code={code} />
                </div>

                <div style={{marginTop: "20px", marginBottom: "20px"}}>
                </div>
                <LinkEditor link={link} />
            </div>
        </div>
    )
}

export default TextbookContentView
