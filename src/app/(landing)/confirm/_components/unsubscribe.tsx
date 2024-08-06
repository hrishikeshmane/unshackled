import React from "react";
import Logo from "~/components/elements/logo";

const UnsubscribePage = () => {
  return (
    <div className="justify-centertext-center relative m-auto flex w-full -translate-y-40 flex-col items-center">
      <div className="mx-auto p-4">
        <Logo />
      </div>
      <h1 className="text-6xl text-primary">{"Sad to see you go :("}</h1>
      <p className="pt-6 text-center text-xl font-bold leading-8 text-muted-foreground">
        {"You've been unsubscribed from the list."}
      </p>
    </div>
  );
};

export default UnsubscribePage;
