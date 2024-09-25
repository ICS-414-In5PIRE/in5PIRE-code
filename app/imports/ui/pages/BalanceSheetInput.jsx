import React from 'react';
import { Form, Segment, Container, Message, Grid, Button, Menu } from 'semantic-ui-react';
import OtherAssets from '../components/BalanceSheetComponents/OtherAssets';
import CashAndCashEquivalents from '../components/BalanceSheetComponents/CashAndCashEquivalents';
import Liabilities from '../components/BalanceSheetComponents/Liabilities';
import CommitmentsAndContingencies from '../components/BalanceSheetComponents/CommitmentsAndContingencies';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * BalanceSheetInput class component for entering balance sheet data using Semantic UI React Form.
 */
class BalanceSheetInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        // CashAndCashEquivalents
        pettyCash: '',
        cash: '',
        cashInBanks: '',
        totalCashAndCashEquivalents: '',

        // OtherAssets
        accountsReceivables: '',
        dueFromOtherFunds: '',
        interestAndDividendsReceivable: '',
        otherAssets: '',
        notesReceivableBeforeOneYear: '',
        notesReceivableAfterOneYear: '',
        securityDeposits: '',
        cashByInvestmentManager: '',
        mutualFunds: '',
        commingledFunds: '',
        hedgeFunds: '',
        privateEquityFunds: '',
        commonTrustFunds: '',
        commonAndPreferredStocks: '',
        privateDebt: '',
        otherInvestments: '',
        subtotalInvestments: '',
        usTreasuries: '',
        usAgencies: '',
        subtotalLoanFund: '',
        totalInvestments: '',
        buildings: '',
        leaseholdImprovements: '',
        furnitureFixturesEquipment: '',
        accumulatedDepreciation: '',
        netCapitalAssets: '',
        landA: '',
        landB: '',
        constructionInProgress: '',
        subtotalCapitalAssetsNet: '',
        llcBuildings: '',
        llcLeaseholdImprovements: '',
        llcFurnitureFixturesEquipment: '',
        vehicles: '',
        llcAccumulatedDepreciation: '',
        llcNet: '',
        llcLand: '',
        llcAssetsNet: '',
        totalCapitalAssetsNet: '',
        restrictedCash: '',
        totalOtherAssets: '',
        deferredOutflowsPensions: '',
        deferredOutflowsOPEB: '',
        netAssetsDeferredOutflows: '',

        // Liabilities
        accountsPayable: '',
        dueToFund: '',
        dueToOtherFunds: '',
        totalLiabilities: '',
        deferredInflowsPensions: '',
        deferredInflowsOPEB: '',
        netLiabilitiesDeferredInflows: '',

        // CommitmentsAndContingencies
        investedInCapitalAssets: '',
        restrictedFederalFunds: '',
        unrestricted: '',
        totalNetPosition: '',
        totalLiabilitiesDeferredNetPosition: '',
      },
      error: '',
      submitted: false,
      activeItem: 'Cash And Equivalents',
    };
  }

  // Handle input changes
  handleChange = (e, { name, value }) => {
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  // Handles menu item change
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  // Handle form submission
  handleSubmit = () => {
    try {
      this.setState({ submitted: true, error: '' });
    } catch (err) {
      this.setState({ error: 'Submission failed. Please try again.' });
    }
  };

  render() {
    const { formData, error, submitted, activeItem } = this.state;

    if (submitted) {
      return (
        <Container>
          <Message positive>
            <Message.Header>Form submitted successfully!</Message.Header>
          </Message>
        </Container>
      );
    }

    return (
      <Container id={PAGE_IDS.BALANCE_SHEET_INPUT}>
        <Grid centered>
          <Grid.Column>
            <h2>Balance Sheet Input</h2>
            {submitted ? (
              <Message positive>
                <Message.Header>Form submitted successfully!</Message.Header>
              </Message>
            ) : (
              <Form onSubmit={this.handleSubmit}>
                <div>
                  <Menu pointing secondary>
                    <Menu.Item
                      name="Cash And Equivalents"
                      active={activeItem === 'Cash And Equivalents'}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      name="Other Assets"
                      active={activeItem === 'Other Assets'}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      name="Liabilities"
                      active={activeItem === 'Liabilities'}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      name="Commitments And Contingencies"
                      active={activeItem === 'Commitments And Contingencies'}
                      onClick={this.handleItemClick}
                    />
                  </Menu>

                  <Segment>
                    {activeItem === 'Cash And Equivalents' && (
                      <CashAndCashEquivalents formData={formData} handleChange={this.handleChange} />
                    )}
                    {activeItem === 'Other Assets' && (
                      <OtherAssets formData={formData} handleChange={this.handleChange} />
                    )}
                    {activeItem === 'Liabilities' && (
                      <Liabilities formData={formData} handleChange={this.handleChange} />
                    )}
                    {activeItem === 'Commitments And Contingencies' && (
                      <CommitmentsAndContingencies formData={formData} handleChange={this.handleChange} />
                    )}
                  </Segment>
                </div>
                {error && (
                  <Message negative>
                    <Message.Header>Submission failed</Message.Header>
                    <p>{error}</p>
                  </Message>
                )}
                <Grid className="py-3">
                  <Grid.Column textAlign="right">
                    <Button primary type="submit">
                      Submit
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default BalanceSheetInput;
