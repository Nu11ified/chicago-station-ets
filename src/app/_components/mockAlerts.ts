import { type Alert } from './AlertCard';

export const mockAlerts: Alert[] = [
  {
    AlertId: '75824',
    Headline: 'Berwyn Station Temporary Closure',
    ShortDescription:
      'Berwyn station is temporarily closed. Please use the adjacent stations at Bryn Mawr or Argyle (enter Argyle station 1 block south of Berwyn on Foster Ave).',
    FullDescription:
      '<p><strong>How does this affect my trip?</strong><br /> Berwyn station is temporarily closed.&nbsp;</p> <p>Please use the adjacent stations at Bryn Mawr or Argyle, located within a few blocks of Berwyn station (enter Argyle station one block south of Berwyn on Foster Ave).</p> <p><strong>Why is service being changed?</strong><br /> Berwyn station is temporarily closed for reconstruction as part of the <a href="https://www.transitchicago.com/rpm/lawrmawr/">Red and Purple Modernization (RPM) Program</a>.</p>',
    SeverityScore: 35,
    SeverityCSS: 'planned',
    Impact: 'Planned Work w/Station(s) Bypassed',
    EventStart: '2021-05-16 00:01',
    EventEnd: '',
    MajorAlert: '0',
    AlertURL:
      'http://www.transitchicago.com/travel_information/alert_detail.aspx?AlertId=75824',
    AffectedStations: ['Berwyn'],
    AffectedRoutes: ['Red Line'],
  },
  {
    AlertId: '75825',
    Headline: 'Elevator Outage at Roosevelt',
    ShortDescription:
      'The elevator at Roosevelt station is temporarily out of service. For accessible service, use nearby stations at Harrison or Cermak-McCormick Place.',
    FullDescription:
      '<p><strong>How does this affect my trip?</strong><br /> The elevator at Roosevelt station is temporarily out of service.</p> <p>For accessible service, use nearby stations at Harrison or Cermak-McCormick Place.</p>',
    SeverityScore: 40,
    SeverityCSS: 'unplanned',
    Impact: 'Elevator Outage',
    EventStart: '2024-04-22 15:00',
    EventEnd: '',
    MajorAlert: '1',
    AlertURL:
      'http://www.transitchicago.com/travel_information/alert_detail.aspx?AlertId=75825',
    AffectedStations: ['Roosevelt'],
    AffectedRoutes: ['Red Line', 'Green Line', 'Orange Line'],
  },
  {
    AlertId: '75826',
    Headline: 'Service Disruption at Addison',
    ShortDescription:
      'Trains are bypassing Addison station due to police activity. Please use Belmont or Sheridan as alternatives.',
    FullDescription:
      '<p><strong>How does this affect my trip?</strong><br /> Trains are not stopping at Addison station due to police activity.</p> <p>Please use Belmont or Sheridan as alternatives.</p>',
    SeverityScore: 50,
    SeverityCSS: 'unplanned',
    Impact: 'Service Disruption',
    EventStart: '2024-04-22 16:30',
    EventEnd: '',
    MajorAlert: '1',
    AlertURL:
      'http://www.transitchicago.com/travel_information/alert_detail.aspx?AlertId=75826',
    AffectedStations: ['Addison'],
    AffectedRoutes: ['Red Line'],
  },
]; 