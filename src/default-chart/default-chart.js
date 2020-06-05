import React, {useRef, useEffect, useState} from "react";
import OrganizationChart from "../components/ChartContainer";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from "react-bootstrap/Popover";
import "./custom-css-test.css";

const DefaultChart = () => {
  const [filename, setFilename]           = useState("organization_chart");
  const [fileextension, setFileextension] = useState("png");
  const [forceDownload, setForceDownload] = useState(false);
  const orgchart = useRef();

  useEffect(() => {
    if (forceDownload) {
      orgchart.current.exportTo(filename, fileextension);
      setForceDownload( false);
    }
  });

  const ds = {
    id: "1",
    name: "Name 1",
    amount: "1 M€",
    period_analyse: '11 M€',
    period_compare: '12 M€',
    evolution: '1%',
    children: [
      { id: "2",
        name: "Name 2",
        amount: "2 M€",
        period_analyse: '21 M€',
        period_compare: '22 M€',
        evolution: '2%',
        children: [
          { id: "4", name: "Name 3", amount: "31 M€", period_analyse: '32', period_compare: '33', evolution: '3%' },
          { id: "5", name: "Name 4", amount: "41€", period_analyse: '42€', period_compare: '43€', evolution: '4%' },
        ]
      },
      { id: "3",
        name: "Name 5",
        amount: "51 M€",
        period_analyse: '52 M€',
        period_compare: '53 M€',
        evolution: '5%',
        children: [
          { id: "6", name: "Name 6", amount: "61 M€", period_analyse: '62', period_compare: '63', evolution: '6%' },
          { id: "7",
            name: "Name 7",
            amount: "71 M€",
            period_analyse: '72',
            period_compare: '73€',
            evolution: '7%',
            children: [
              { id: "8", name: "Name 8", amount: "81 M€", period_analyse: '82', period_compare: '83', evolution: '8%' },
              { id: "9",
                name: "Name 9",
                amount: "91 M€",
                period_analyse: '92€',
                period_compare: '93€',
                evolution: '9%',
                children: [
                  { id: "10", name: "Name 10", amount: "101 M€", period_analyse: '102', period_compare: '103', evolution: '10%' },
                  { id: "11", name: "Name 11", amount: "111 M€", period_analyse: '112€', period_compare: '113€', evolution: '11%' }
                ]
              },
            ]
          },
        ]
      },
    ]
  };

  const renderNode = (props) => {
    return (
        <OverlayTrigger
            placement="auto"
            delay={{show: 10, hide: 10}}
            id={Math.round(Math.random() + Date.now())}
            overlay={
              <Popover id={Math.round(Math.random() + Date.now())} >
                <div style={{padding: 5, fontSize: 10}}>
                  <h6 className="bp3-heading"
                      style={{"textTransform": "uppercase", marginBottom: 5}}>
                    {props.nodeData.name}
                  </h6>
                  Partie :
                  <br/>Exemple 1 : {props.nodeData.period_analyse}
                  <br/>Exemple 2 : {props.nodeData.period_compare}
                </div>
              </Popover>
            }>
          <div className="orgChartCell">
            <div style={{
              fontSize: 12,
              padding: 2,
              fontWeight: 'bold',
              color: 'black',
            }}>
              <div className={'orgChartTitle'}>
                {props.nodeData.name}
              </div>
              <p className="mtop1" style={{color: 'black'}}>
                {props.nodeData.amount}
              </p>
              <div style={{fontSize: 10, color: 'black'}}>
                Exemple 1 : {props.nodeData.period_analyse}
              </div>
              <div style={{fontSize: 10, color: 'black'}}>
                Exemple 2 : {props.nodeData.period_compare}
              </div>
            </div>
          </div>
        </OverlayTrigger>
    );
  };

  const onNameChange = event => {
    setFilename(event.target.value);
  };

  const exportTo = async () => {
    orgchart.current.zoomReset();
    setForceDownload( true);
  };

  const zoomReset = () => {
    orgchart.current.zoomReset();
  };

  const zoomPositive = () => {
    orgchart.current.zoomPositive();
  };

  const zoomNegative = () => {
    orgchart.current.zoomNegative();
  };

  return (
      <>
        <section className="toolbar">
          <label htmlFor="txt-filename">Filename:</label>
          <input
              id="txt-filename"
              type="text"
              value={filename}
              onChange={onNameChange}
              style={{ fontSize: "1rem", marginRight: "2rem" }}
          />
          <button
              onClick={exportTo}
              style={{ marginLeft: "2rem" }}
          >
            Export
          </button>
          <button
              onClick={zoomReset}
              style={{ marginLeft: "2rem" }}
          >
            Reset zoom
          </button>
          <button
              onClick={zoomPositive}
              style={{ marginLeft: "2rem" }}
          >
            +
          </button>
          <button
              onClick={zoomNegative}
              style={{ marginLeft: "2rem" }}
          >
            -
          </button>
        </section>
        <OrganizationChart
          datasource={ds}
          collapsible={false}
          NodeTemplate={renderNode}
          chartClass={'my-custom-chart'}
          ref={orgchart}
          pan={true}
          zoom={true}
        />
      </>
  );
};

export default DefaultChart;
