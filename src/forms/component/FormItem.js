import { useState } from "react";

import { NavLink } from "react-router-dom";

import Backdrop from "../../shared/collection/Backdrop";
import Pop from "../../shared/collection/Pop";
import Moment from 'react-moment';
import { toast, Zoom } from 'react-toastify';

import ActionItem from "./ActionItem";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
const FormItem = ({ form, closeForm, renameForm, copyForm }) => {
  const formUrl = `https://pluralforms.com/form/${form.form_id}/${form.ref_id}`;
  const [pop, setPop] = useState(false);

  const [popShare, setPopShare] = useState(false);
  const openPop = () => {
    setPop(true);
  };
  const copy = () => {
    copyForm(form);
    setPop(false);
  };
  const close = () => {
    closeForm(form);
    setPop(false);
  }
  const rename = () => {
    // editForm(form);
    renameForm(form)
    setPop(false);

  };
  const share = () => {
    console.log('share..');
    setPop(true);
    setPopShare(true);
  }
  // const settings = () => {
  //   history.push(`user/form/${form_id}/settings`);
  // };
  const endPop = () => {
    setPop(false);
    setPopShare(false);
  }
  const previewForm = () => {
    const win = window.open(formUrl, "_blank");
    win.focus();
    setPop(false);
    setPopShare(false);
  }
  const copyFormLink = () => {
    setPop(false);
    setPopShare(false);

    navigator.clipboard.writeText(formUrl);
    toast.configure();
    const notify = () => toast.success(`Your link is ready.. 😎`, {
      transition: Zoom,
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,

    })
    notify();
  }
  const handleAction = (checkAction) => {
    console.log(checkAction);
    const { action } = checkAction;
    if (action === "rename") {
      rename();
    } else if (action === "close") {
      close();
    }
    else if (action === "copy") {
      copy();
    }
  };
  const ActionsArr = [
    {
      id: 0,
      action: "build",
      name: "Build",
      link: true,
    },
    {
      id: 1,
      action: "share",
      name: "Share",
      link: true,
    },
    {
      id: 2,
      action: "results",
      name: " Results",
      link: true,
    },

    {
      id: 3,
      action: "close",
      name: "Close",
      link: false,
    },

    {
      id: 4,
      action: "copy",
      name: "Copy",
      link: false,
    },
    {
      id: 5,
      action: "rename",
      name: "Rename",
      link: false,
    },
    // {
    //   id: 6,
    //   action: "settings",
    //   name: "Settings",
    //   link: false,
    // },
  ];

  const { form_id, title, no_views, no_questions, no_responses, updated_at } = form;

  const header = (
    <div className="flex w-full items-center -mb-1 space-x-1 py-2 px-3 truncate font-medium text-xl bg-white">
      <div>{title}</div>
    </div>
  );
  return (
    <>
      <div
        className=" md:border-2  md:rounded-lg md:flex-row  md:m-2 hover:shadow-lg
                                shadow-sm    md:flex flex-col w-full mb-1    
                        "
      >
        {/* Mobile Device Design Here.. */}
        <div className="md:hidden flex flex-col space-x-1  m-1 tracking-wide text-sm shadow border border-gray-400">
          <div className="flex w-full p-2 ">
            <NavLink
              to={`/user/form/${form_id}/questions`}
              className="flex w-10/12 px-1 space-x-2 items-center"
            >
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center min-w-max truncate">
                  <div className="w-10/12  truncate text-lg tracking-wider"> {title}{" "}</div>
                  <div className="flex-auto text-xs font-medium ">{no_views} {no_views > 1 ? "views" : "view"}</div>
                </div>
                <div className="flex space-x-2 text-xs ">
                  <div>{no_questions}  {no_questions > 1 ? "questions" : "question"}</div>
                  <div>{no_responses}  {no_responses > 1 ? "responses" : "response"}</div>
                  <div><Moment format="MMM D, YYYY.">{updated_at}</Moment> </div>
                </div>
              </div>

            </NavLink>
            <button className="flex flex-auto items-center justify-center" onClick={() => openPop()}>
              <DotsHorizontalIcon className="h-8" />
            </button>
          </div>
        </div>
        <div className="hidden md:flex w-full flex-wrap p-1">
          <NavLink
            className="w-1/2 flex p-2  items-center "
            to={`/user/form/${form_id}/build`}
          >
            <div className="w-11/12 flex space-x-2">
              <div className="w-11/12  ">
                <h3 className="text-xl truncate pr-8 font-medium flex tracking-wide"> {title}</h3>
                <div className="flex text-sm space-x-3 tracking-wider">
                  <p>  <span className="font-bold">{no_questions} </span>{no_questions > 1 ? "questions" : "question"}{" "}</p>
                  <p>  <span className="font-bold">{no_views} </span>{no_views > 1 ? "views" : "view"}{" "}</p>

                  <p>   <span className="font-bold">{no_responses}</span>   {no_responses > 1 ? "responses" : "response"}</p>
                  <p> <Moment format="MMM D, YYYY.">{updated_at}</Moment> </p>

                </div>

              </div>
            </div>

          </NavLink>
          <div className="flex-auto flex space-x-2 w-full md:w-auto p-2 justify-start xl:justify-end">
            {ActionsArr.map((a) => (
              <ActionItem
                {...a}
                key={a.id}
                form_id={form_id}

                onHandle={() => handleAction(a)}
              />
            ))}
          </div>
        </div>
      </div>
      <Pop
        header={header}
        show={pop}
        message="form"
        copy={() => copy()}
        close={() => close()}
        rename={() => rename()}
        // settings={() => settings()}
        share={() => share()}
      />
      {popShare &&
        <Pop
          copyFormLink={copyFormLink}
          previewForm={previewForm}
          form={form}
          show={pop}
          message="share"
          type="share"
        />
      }
      {pop && <Backdrop onClick={() => endPop()} />}
    </>
  );
};
export default FormItem;
