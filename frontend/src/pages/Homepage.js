import React, { useContext, useEffect, useState } from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import Add from "../components/Add";
import { useQuery } from "react-query";
import Divider from "../assets/divider.png";
import { Fragment } from "react";
import { Store } from "../store";
import { useHistory, useLocation } from "react-router";

export default function Homepage() {
  const [selected, setSelected] = useState(null);
  const [existing, setExisting] = useState();
  const location = useLocation();
  const history = useHistory();

  const { state, setState } = useContext(Store);

  const { data, error, isLoading, refetch } = useQuery(
    "node",
    async () => {
      let id = new URLSearchParams(location.search).get("id");
      let url = "http://localhost:5000/api/node";
      if (id) {
        url += `?id=${id}`;
      }

      console.log("fetching all Nodes");
      const response = await fetch(url);
      return (await response.json()).node[0];
    },
    {}
  );

  useEffect(() => {
    refetch();
  }, [new URLSearchParams(location.search).get("id")]);

  return (
    <div className="main_div">
      <div className="center_div">
        <div className="header">
          <p style={{ fontSize: 25, color: "rgba(180, 38, 85)" }}>
            Family Tree
          </p>
          <div>
            <Add node={data} />
          </div>
        </div>

        <br />
        {data && (
          <Fragment>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card
                onClick={() => {
                  setState((prev) => ({ ...prev, selected: data }));
                  setSelected(data);
                }}
                {...data}
              />
            </div>
            <img src={Divider} />
            <div>
              {data?.children.map((el) => (
                <Card
                  {...el}
                  onDoubleClick={() => {
                    history.push(`/?id=${el._id}`);
                  }}
                  onClick={() => {
                    setState((prev) => ({ ...prev, selected: el }));
                  }}
                />
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
